'use client';

import React from 'react';
import { TestimonialCard } from '@/components/features/TestimonialCard';
import { testimonials } from '@/lib/constants';

export function TestimonialsSection() {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="md:block hidden">
      <p className="text-center text-2xl font-medium text-[#e94c60ff]">Feedback</p>
      <p className="text-center text-4xl font-bold pb-10">Our Client Story</p>
      <section className="bg-white mt-8 flex flex-col md:flex-row md:gap-3 gap-6 px-2">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
          />
        ))}
      </section>
    </div>
  );
}
