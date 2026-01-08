import React from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 16,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => (
        <FaStar
          key={index}
          className={index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
          size={size}
        />
      ))}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}
