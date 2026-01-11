'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { PostCard } from '@/components/features/PostCard';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface BlogFeaturesSectionProps {
  posts: any[];
}

export function BlogFeaturesSection({ posts }: BlogFeaturesSectionProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="bg-[#FEF9E7] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Text */}
        <div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            Features
          </h2>
          <p className="mt-6 text-gray-700 max-w-lg">
            Health related articles to support a better lifestyle — from heart to brain wellness.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSwiper={(s) => setSwiper(s)}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={index}>
                <PostCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <button
            onClick={() => swiper?.slidePrev()}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
          >
            <AiOutlineArrowLeft size={22} />
          </button>

          <button
            onClick={() => swiper?.slideNext()}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
          >
            <AiOutlineArrowRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
