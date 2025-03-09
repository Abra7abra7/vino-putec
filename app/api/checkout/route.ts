import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
// Make sure STRIPE_SECRET_KEY is set in your .env.local file (should start with sk_test_ or sk_live_)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc';
const stripe = new Stripe(stripeSecretKey);

console.log('Stripe initialized with key starting with:', stripeSecretKey.substring(0, 8));


export async function POST(req: NextRequest) {
  console.log('Checkout API route called');
  
  try {
    const body = await req.json();
    console.log('Request body received:', JSON.stringify(body, null, 2));
    
    const { items, successUrl, cancelUrl } = body;

    // Validate the request
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid request: Items array is missing or empty');
      return NextResponse.json(
        { error: 'Invalid request. Items array is required.' },
        { status: 400 }
      );
    }

    if (!successUrl || !cancelUrl) {
      console.error('Invalid request: Success or cancel URL is missing');
      return NextResponse.json(
        { error: 'Success and cancel URLs are required.' },
        { status: 400 }
      );
    }

    // Create line items for Stripe checkout
    const lineItems = items.map((item) => {
      // Ensure all required fields exist
      if (!item.name || !item.price || !item.quantity) {
        throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
      }
      
      // Handle different item types
      if (item.itemType === 'experience' || item.itemType === 'event') {
        // For bookings, create a custom description with booking details
        const bookingInfo = item.bookingInfo;
        if (!bookingInfo) {
          throw new Error(`Booking info missing for booking item: ${JSON.stringify(item)}`);
        }
        
        const formattedDate = new Date(bookingInfo.date).toLocaleDateString();
        
        let description = `${item.itemType === 'experience' ? 'Experience' : 'Event'} Booking - ${item.name}\n`;
        description += `Date: ${formattedDate}\n`;
        description += `Time: ${bookingInfo.time}\n`;
        description += `Attendees: ${bookingInfo.attendees}`;
        
        if (bookingInfo.specialRequests) {
          description += `\nSpecial Requests: ${bookingInfo.specialRequests}`;
        }
        
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${item.name} - ${item.itemType === 'experience' ? 'Experience' : 'Event'} Booking`,
              description,
              images: item.image ? [item.image] : undefined,
              metadata: {
                itemType: item.itemType,
                bookingDate: bookingInfo.date,
                bookingTime: bookingInfo.time,
                attendees: bookingInfo.attendees.toString(),
                dateId: bookingInfo.dateId,
                specialRequests: bookingInfo.specialRequests || ''
              }
            },
            unit_amount: Math.round(item.price * 100), // Stripe uses cents
          },
          quantity: item.quantity,
        };
      } else {
        // Regular wine product
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${item.name} ${item.year ? `(${item.year})` : ''}`,
              description: `Putec Winery - ${item.name}`,
              images: item.image ? [item.image] : undefined,
            },
            unit_amount: Math.round(item.price * 100), // Stripe uses cents
          },
          quantity: item.quantity,
        };
      }
    });
    
    console.log('Created line items:', JSON.stringify(lineItems, null, 2));

    // Check if there are any booking items
    const hasBookingItems = items.some(item => item.itemType === 'experience' || item.itemType === 'event');
    
    // Create a Stripe checkout session
    console.log('Creating Stripe checkout session...');
    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderId: `order-${Date.now()}`,
        hasBookings: hasBookingItems ? 'true' : 'false'
      },
    };
    
    // Only add shipping options for orders that include physical products (wines)
    if (!hasBookingItems || items.some(item => item.itemType === 'wine')) {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['ES', 'FR', 'GB', 'DE', 'IT', 'US'],
      };
      
      sessionConfig.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500, // €5.00
              currency: 'eur',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500, // €15.00
              currency: 'eur',
            },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 2,
              },
            },
          },
        },
      ];
    }
    
    // For booking-only orders, collect customer email
    if (hasBookingItems && !items.some(item => item.itemType === 'wine')) {
      sessionConfig.customer_email_collection = true;
    }
    
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log('Checkout session created successfully with ID:', session.id);
    
    // Return the session ID to the client
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `An error occurred during checkout: ${errorMessage}` },
      { status: 500 }
    );
  }
}
