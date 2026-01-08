import React from 'react';
import { Carousel } from '@/components/ui/Carousel';
import { TestimonialCard } from '@/components/features/TestimonialCard';
import { testimonials } from '@/lib/constants';

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <p className="text-center text-gray-600 mb-2">Feedback</p>
        <h3 className="text-3xl font-bold text-center mb-12">Our Client Story</h3>

        <Carousel
          slidesPerView={1}
          spaceBetween={30}
          autoplay={true}
          showNavigation={true}
          showPagination={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
