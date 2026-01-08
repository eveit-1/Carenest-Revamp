import React from 'react';
import Image from 'next/image';
import { StarRating } from '@/components/ui/StarRating';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="p-6 bg-white rounded-lg shadow-md h-full flex flex-col">
      <blockquote className="mb-4 flex-grow">
        <p className="text-gray-700 italic leading-relaxed">
          &quot;{testimonial.quote}&quot;
        </p>
      </blockquote>
      <div className="flex items-center mt-4">
        {testimonial.avatar ? (
          <div className="relative w-12 h-12 rounded-full mr-4 flex-shrink-0 overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 flex-shrink-0" />
        )}
        <div className="flex-grow">
          <p className="font-semibold text-gray-900">{testimonial.author}</p>
          <StarRating rating={testimonial.rating} size={16} />
        </div>
      </div>
    </figure>
  );
}
