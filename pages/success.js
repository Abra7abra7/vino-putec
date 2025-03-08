import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowRight, Home, Facebook, Instagram, Twitter } from 'lucide-react';
import { useCart } from '../app/components/cart/CartProvider';
import { LuxuryWineryHeader } from '../app/components/ui/luxury-winery-header';
import { LuxuryWineryFooter } from '../app/components/ui/luxury-winery-footer';

export default function Success() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const { session_id } = router.query;

  useEffect(() => {
    // Clear the cart when the success page loads
    clearCart();
    
    // Only fetch the session if we have a session_id
    if (session_id) {
      const fetchCheckoutSession = async () => {
        try {
          const response = await fetch(`/api/checkout-sessions/${session_id}`);
          if (response.ok) {
            const data = await response.json();
            setSession(data);
          }
        } catch (error) {
          console.error('Error fetching checkout session:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchCheckoutSession();
    } else {
      setIsLoading(false);
    }
  }, [session_id, clearCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <LuxuryWineryHeader />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              Thank You for Your Order!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Your order has been successfully processed. We'll send you a confirmation email with your order details shortly.
            </p>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
                <span className="ml-2 text-gray-600">Loading order details...</span>
              </div>
            ) : session ? (
              <div className="mb-8">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h2 className="text-lg font-medium text-gray-800 mb-2">Order Summary</h2>
                  <p className="text-gray-600">Order ID: {session.id}</p>
                  <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-gray-600">Payment Status: {session.payment_status}</p>
                </div>
              </div>
            ) : null}
            
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-xl font-playfair font-semibold text-gray-800 mb-4">
                What's Next?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-amber-50 p-6 rounded-lg">
                  <ShoppingBag className="h-8 w-8 text-amber-700 mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Track Your Order</h3>
                  <p className="text-gray-600 mb-4">
                    You'll receive an email with tracking information once your order ships.
                  </p>
                </div>
                
                <div className="bg-amber-50 p-6 rounded-lg">
                  <Home className="h-8 w-8 text-amber-700 mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Create an Account</h3>
                  <p className="text-gray-600 mb-4">
                    Sign up to manage your orders and get personalized wine recommendations.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/wines" 
                  className="inline-flex items-center justify-center bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors"
                >
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <LuxuryWineryFooter
        brandName="Putec"
        tagline="Crafting exceptional wines in Ribera del Duero since 1892"
        wineCollections={[
          {
            name: "Red Wines",
            links: [
              { href: "/wines/reserve-cabernet", label: "Reserve Cabernet" },
              { href: "/wines/grand-cru-tempranillo", label: "Grand Cru Tempranillo" },
              { href: "/wines/limited-merlot", label: "Limited Edition Merlot" },
              { href: "/wines/crianza", label: "Crianza" },
            ],
          },
          {
            name: "Limited Editions",
            links: [
              { href: "/wines/vintage-collection", label: "Vintage Collection" },
              { href: "/wines/estate-reserve", label: "Estate Reserve" },
              { href: "/wines/winemakers-selection", label: "Winemaker's Selection" },
              { href: "/wines/legacy-series", label: "Legacy Series" },
            ],
          },
        ]}
        contactInfo={{
          address: "Carretera N-122, km 311, 47350 Quintanilla de Onésimo, Valladolid, Spain",
          phone: "+34 983 680 314",
          email: "visitas@putec.com",
        }}
        socialLinks={[
          {
            icon: <Facebook className="h-5 w-5" />,
            href: "https://facebook.com/putecwinery",
            label: "Facebook",
          },
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://instagram.com/putecwinery",
            label: "Instagram",
          },
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com/putecwinery",
            label: "Twitter",
          },
        ]}
        mainLinks={[
          { href: "/about", label: "Our Heritage" },
          { href: "/vineyard", label: "The Vineyard" },
          { href: "/experiences", label: "Wine Experiences" },
          { href: "/events", label: "Private Events" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
          { href: "/shipping", label: "Shipping Information" },
        ]}
        copyright={{
          text: "© 2024 Putec Winery",
          license: "All rights reserved",
        }}
      />
    </div>
  );
}
