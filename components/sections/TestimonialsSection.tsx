'use client';

import React from 'react';
import { Carousel } from '@/components/ui/Carousel';
import { TestimonialCard } from '@/components/features/TestimonialCard';
import { testimonials } from '@/lib/constants';

export function TestimonialsSection() {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-20">
      <h2 className="text-center text-3xl lg:text-4xl font-bold mb-10">
        What Our Clients Say
      </h2>

      <Carousel
        slidesPerView={1}
        spaceBetween={30}
        showNavigation
        showPagination
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
          />
        ))}
      </Carousel>
    </section>
  );
}
