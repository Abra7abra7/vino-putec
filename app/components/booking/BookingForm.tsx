"use client";

import React, { useState } from 'react';
import { Users, CalendarClock, MessageSquare, ShoppingCart } from 'lucide-react';
import { AvailableDate } from '../../data/bookable-experiences';
import { useCart } from '../cart/CartProvider';

interface BookingFormProps {
  itemId: string;
  itemName: string;
  itemType: 'experience' | 'event';
  price: number;
  image: string;
  selectedDate: AvailableDate | null;
  maxAttendees: number;
}

const BookingForm: React.FC<BookingFormProps> = ({
  itemId,
  itemName,
  itemType,
  price,
  image,
  selectedDate,
  maxAttendees,
}) => {
  const { addBookingItem } = useCart();
  const [attendees, setAttendees] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Calculate available spots
  const availableSpots = selectedDate ? selectedDate.maxCapacity - selectedDate.bookedCount : 0;
  const maxPossibleAttendees = Math.min(maxAttendees, availableSpots);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!selectedDate) {
      setError('Please select a date and time');
      return;
    }
    
    if (attendees <= 0 || attendees > maxPossibleAttendees) {
      setError(`Please select between 1 and ${maxPossibleAttendees} attendees`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add booking to cart
      addBookingItem({
        id: itemId,
        name: itemName,
        price: price,
        image: image,
        itemType: itemType,
        bookingInfo: {
          date: selectedDate.date,
          time: selectedDate.startTime + (selectedDate.endTime ? ` - ${selectedDate.endTime}` : ''),
          attendees: attendees,
          specialRequests: specialRequests.trim() || undefined,
          dateId: selectedDate.id
        }
      });
      
      setSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to add booking to cart. Please try again.');
      console.error('Error adding booking to cart:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h2>
      
      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-4">
          <p className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Added to cart successfully!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-4">
              <p>{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {/* Selected Date & Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Date & Time
              </label>
              <div className="flex items-center bg-gray-50 p-3 rounded-md">
                <CalendarClock className="h-5 w-5 text-amber-700 mr-2" />
                {selectedDate ? (
                  <span>
                    {new Date(selectedDate.date).toLocaleDateString()} at {selectedDate.startTime}
                    {selectedDate.endTime ? ` - ${selectedDate.endTime}` : ''}
                  </span>
                ) : (
                  <span className="text-gray-500 italic">Please select a date and time</span>
                )}
              </div>
            </div>
            
            {/* Number of Attendees */}
            <div>
              <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Attendees
              </label>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-amber-700 mr-2" />
                <select
                  id="attendees"
                  value={attendees}
                  onChange={(e) => setAttendees(parseInt(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  disabled={!selectedDate || maxPossibleAttendees <= 0}
                >
                  {Array.from({ length: maxPossibleAttendees }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'person' : 'people'} (€{(price * num).toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {selectedDate ? `${availableSpots} spots available` : 'Select a date to see availability'}
              </p>
            </div>
            
            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests (Optional)
              </label>
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-amber-700 mr-2 mt-2" />
                <textarea
                  id="specialRequests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Any dietary requirements, accessibility needs, or other special requests..."
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!selectedDate || isSubmitting || maxPossibleAttendees <= 0}
                className="w-full flex items-center justify-center bg-amber-700 text-white py-3 px-4 rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </form>
      )}
      
      {/* Booking Information */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Booking Information</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Bookings require full payment at checkout</li>
          <li>• Free cancellation up to 48 hours before the scheduled time</li>
          <li>• Please arrive 15 minutes before your scheduled time</li>
          {itemType === 'experience' && (
            <li>• Comfortable shoes recommended for vineyard tours</li>
          )}
          {itemType === 'event' && (
            <li>• Final attendee count can be adjusted up to 7 days before the event</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookingForm;
