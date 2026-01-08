'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps {
  children: React.ReactNode[];
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  showSlideCounter?: boolean;
  breakpoints?: {
    [width: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

export function Carousel({
  children,
  slidesPerView = 1,
  spaceBetween = 30,
  autoplay = false,
  showNavigation = true,
  showPagination = true,
  showSlideCounter = true,
  breakpoints,
}: CarouselProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = children.length;

  const defaultBreakpoints = breakpoints || {
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
    1280: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  };

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setCurrentSlide(swiper.activeIndex + 1);
      });
    }
  }, [swiper]);

  return (
    <div className="relative">
      {showSlideCounter && (
        <div className="text-center mb-4 text-gray-600">
          Slide {currentSlide} of {totalSlides}
        </div>
      )}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={showNavigation ? {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          } : false}
          pagination={showPagination ? { clickable: true } : false}
          autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
          breakpoints={defaultBreakpoints}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
          className="pb-12"
        >
          {children.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
        {showNavigation && (
          <>
            <button 
              className="swiper-button-prev-custom absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-primary-green" size={20} />
            </button>
            <button 
              className="swiper-button-next-custom absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-primary-green" size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
