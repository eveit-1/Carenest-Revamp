import React from 'react';
import Image from 'next/image';
import { Carousel } from '@/components/ui/Carousel';
import { ExpertCard } from '@/components/features/ExpertCard';
import { experts } from '@/lib/constants';

export function ExpertsSection() {
  return (
    <div className="star w-[100%] mt-0 md:mt-6 lg:pt-10 px-6 text-white md:px-10">
      <h3 className="text-2xl md:text-4xl font-bold text-white text-center underline underline-offset-[8px] decoration-[#E94C60] decoration-4 pt-10 md:pt-10 lg:pt-0">
        Our All-Star Experts
      </h3>
      <p className="text-lg md:text-lg font-semibold lg:font-regular text-white text-center pt-4 px-10 md:px-0">
        We strive to offer you the best medical assistance from the best counsellors in India.
      </p>
      
      <div className="flex flex-row mt-4 lg:mt-10">
        {/* Carousel Section */}
        <div className="w-full pl-0 lg:pl-10 lg:w-[45%] mx-auto">
          <Carousel
            slidesPerView={1}
            spaceBetween={0}
            autoplay={false}
            showNavigation={false}
            showPagination={true}
            showSlideCounter={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
            }}
          >
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </Carousel>
          
          {/* Custom Navigation Buttons Below Carousel */}
          <div className="flex justify-center gap-6 mt-6 mb-4">
            <button 
              className="swiper-button-prev-custom bg-[#E94C60] rounded-full p-3 text-white hover:bg-[#d43d51] transition-colors"
              aria-label="Previous slide"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="w-6 h-6 md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
              </svg>
            </button>
            <button 
              className="swiper-button-next-custom bg-[#E94C60] rounded-full p-3 text-white hover:bg-[#d43d51] transition-colors"
              aria-label="Next slide"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="w-6 h-6 md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Grid Section - Hidden on mobile, visible on large screens */}
        <div className="hidden w-[55%] h-[30rem] px-10 lg:p-10 lg:grid grid-cols-2 md:grid-cols-3 grid-rows-4 md:grid-rows-3 mt-10 md:mt-0 text-sm lg:text-md">
          {experts.map((expert) => (
            <div key={expert.id} className="">
              <Image
                alt=""
                src={expert.image || '/images/CN1.png'}
                width={100}
                height={100}
                className="w-10 h-10 lg:w-24 lg:h-24 rounded-full m-auto"
                loading="lazy"
              />
              <h1 className="text-md lg:text-md text-center">{expert.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
