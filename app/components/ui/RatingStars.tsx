"use client";

import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  color = 'text-yellow-500'
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const starSize = sizeClasses[size];

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star 
          key={i} 
          className={`${starSize} ${i < rating ? `${color} fill-current` : 'text-gray-300'}`} 
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{rating} out of {maxRating} stars</span>
    </div>
  );
}
