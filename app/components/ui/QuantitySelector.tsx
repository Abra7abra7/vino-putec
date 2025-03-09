"use client";

import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 999,
  compact = false
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const newQuantity = Math.max(min, Math.min(max, value));
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center border rounded">
      <button 
        onClick={handleDecrease}
        className={`${compact ? 'p-1' : 'p-2'} text-gray-500 hover:text-gray-700 disabled:opacity-50`}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </button>
      
      <input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className={`${compact ? 'w-8' : 'w-12'} text-center focus:outline-none`}
        aria-label="Quantity"
      />
      
      <button 
        onClick={handleIncrease}
        className={`${compact ? 'p-1' : 'p-2'} text-gray-500 hover:text-gray-700 disabled:opacity-50`}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </button>
    </div>
  );
}
