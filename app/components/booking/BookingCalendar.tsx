"use client";

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import { AvailableDate } from '../../data/bookable-experiences';

interface BookingCalendarProps {
  availableDates: AvailableDate[];
  onSelectDate: (date: AvailableDate) => void;
  selectedDateId: string | null;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  availableDates,
  onSelectDate,
  selectedDateId,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    // Default to the current month
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Group available dates by month and day
  const groupedDates = availableDates.reduce<Record<string, Record<string, AvailableDate[]>>>((acc, date) => {
    const dateObj = new Date(date.date);
    const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;
    const dayKey = dateObj.getDate().toString();
    
    if (!acc[monthKey]) {
      acc[monthKey] = {};
    }
    
    if (!acc[monthKey][dayKey]) {
      acc[monthKey][dayKey] = [];
    }
    
    acc[monthKey][dayKey].push(date);
    return acc;
  }, {});

  // Get dates for the current month view
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  // Format month name
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const monthKey = `${year}-${month}`;
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 w-10"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayKey = day.toString();
      const hasAvailability = groupedDates[monthKey]?.[dayKey]?.length > 0;
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`
            h-10 w-10 flex items-center justify-center rounded-full 
            ${hasAvailability ? 'cursor-pointer hover:bg-amber-100' : 'text-gray-300 cursor-not-allowed'}
            ${isToday ? 'border border-amber-500' : ''}
          `}
          onClick={() => {
            if (hasAvailability) {
              // Show time slots for this day
              setSelectedDay(`${year}-${month + 1}-${day}`);
            }
          }}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  // State for selected day to show time slots
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Get time slots for the selected day
  const getTimeSlotsForDay = () => {
    if (!selectedDay) return [];
    
    // Convert selectedDay (YYYY-MM-DD) to date format used in availableDates
    const [year, month, day] = selectedDay.split('-').map(Number);
    const formattedDate = new Date(year, month - 1, day).toISOString().split('T')[0];
    
    return availableDates.filter(date => date.date === formattedDate);
  };

  // Render time slots for selected day
  const renderTimeSlots = () => {
    const timeSlots = getTimeSlotsForDay();
    
    if (timeSlots.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          No available time slots for this day.
        </div>
      );
    }
    
    return (
      <div className="space-y-2 mt-4">
        <h3 className="text-lg font-medium text-gray-900">Available Times</h3>
        <div className="grid grid-cols-1 gap-2">
          {timeSlots.map((slot) => {
            const isAvailable = slot.bookedCount < slot.maxCapacity;
            const isSelected = selectedDateId === slot.id;
            
            return (
              <button
                key={slot.id}
                onClick={() => isAvailable && onSelectDate(slot)}
                disabled={!isAvailable}
                className={`
                  p-3 rounded-md border flex items-center justify-between
                  ${isSelected 
                    ? 'bg-amber-100 border-amber-500 text-amber-900' 
                    : isAvailable 
                      ? 'border-gray-200 hover:border-amber-500 hover:bg-amber-50' 
                      : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-700" />
                  <span>
                    {slot.startTime}
                    {slot.endTime ? ` - ${slot.endTime}` : ''}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span>
                    {slot.maxCapacity - slot.bookedCount} available
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-amber-700" />
          Select Date & Time
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-center font-medium mb-2">
          {formatMonth(currentMonth)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {renderCalendar()}
        </div>
      </div>
      
      {selectedDay && renderTimeSlots()}
    </div>
  );
};

export default BookingCalendar;
