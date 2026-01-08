'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PostCard } from '@/components/features/PostCard';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: {
    url: string;
  };
}

interface BlogFeaturesSectionProps {
  posts: Post[];
}

export function BlogFeaturesSection({ posts }: BlogFeaturesSectionProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="text-black mt-20">
      <div className="flex flex-col md:flex-row w-full h-auto bg-[#FEF9E7] px-6 lg:px-20">
        <div className="w-full md:w-[50%] pt-10 lg:pt-16">
          <h3 className="text-3xl lg:text-5xl font-semibold">Features</h3>
          <p className="text-sm lg:text-xl pt-4 md:pt-10 pr-4 md:pr-10 lg:pr-20">
            We all want to maintain good health as we get older. You can rely on our health related
            articles for better understanding of a healthy lifestyle, from heart to brain, we have
            it all.
          </p>
        </div>
        <div className="w-full md:w-[50%] mb-10 md:mx-10 relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={setSwiper}
            className="pb-10 lg:pl-10"
          >
            {posts.map((post, index) => (
              <SwiperSlide key={index}>
                <PostCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => swiper?.slidePrev()}
            className="absolute top-1/2 left-0 z-10 -translate-y-1/2"
          >
            <AiOutlineArrowLeft className="rounded-full p-2 bg-gray-200 text-black text-4xl mt-60" />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="absolute top-1/2 right-0 z-10 -translate-y-1/2"
          >
            <AiOutlineArrowRight className="rounded-full p-2 bg-gray-200 text-black text-4xl mt-60" />
          </button>
        </div>
      </div>
    </div>
  );
}
