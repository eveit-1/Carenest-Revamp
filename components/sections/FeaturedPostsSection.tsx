'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FeaturedPostCard } from '@/components/features/FeaturedPostCard';
import { AiOutlineArrowRight } from 'react-icons/ai';

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: {
    url: string;
  };
}

interface FeaturedPostsSectionProps {
  posts: Post[];
}

export function FeaturedPostsSection({ posts }: FeaturedPostsSectionProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="text-black relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={2000}
        onSwiper={setSwiper}
        className="pb-6"
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <FeaturedPostCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiper?.slideNext()}
        className="absolute bottom-4 right-4 z-10"
      >
        <AiOutlineArrowRight className="rounded-full p-2 bg-[#9AB898] text-white text-4xl" />
      </button>
    </div>
  );
}
