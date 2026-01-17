import React from 'react';
import Image from 'next/image';
import { Testimonial } from '@/types';
import { AiFillStar } from 'react-icons/ai';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const fullStars = Math.floor(testimonial.rating);
  
  return (
    <div className="md:w-1/3 relative md:relative w-[75%] h-72 lg:h-56 mx-auto text-center rounded-lg shadow-xl mt-2 p-2">
      <figure className="max-w-screen-md mx-auto text-white">
        <svg 
          className="md:h-14 md:w-14 h-12 w-12 -top-4 -left-0 p-4 justify-start mb-3 rounded-full text-white bg-[#e94c60ff] absolute md:-top-8" 
          viewBox="0 0 24 27" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" 
            fill="currentColor"
          />
        </svg>
        <blockquote>
          <p className="md:text-lg md:font-medium text-base font-medium text-gray-900 p-4">
            &quot;{testimonial.quote}&quot;
          </p>
        </blockquote>
        <figcaption className="flex flex-col lg:flex-row items-center justify-between pt-0 lg:pt-10 px-3">
          <div className="flex flex-row items-center gap-x-3">
            {testimonial.avatar && (
              <Image
                alt="profile picture"
                src={testimonial.avatar}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
                loading="lazy"
              />
            )}
            <div className="pr-3 font-medium text-gray-900 lg:p-4 py-4">
              {testimonial.author}
            </div>
          </div>
          <div className="flex flex-row items-center">
            <p className="px-1 font-semibold">{testimonial.rating.toFixed(1)}</p>
            <p className="flex flex-row items-center gap-x-0 text-xl text-[#e94c60ff]">
              {[...Array(fullStars)].map((_, i) => (
                <AiFillStar key={i} />
              ))}
            </p>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
