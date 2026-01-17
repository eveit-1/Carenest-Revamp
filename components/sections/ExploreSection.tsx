'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { CategoriesPostCard } from '@/components/features/CategoriesPostCard';

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  featuredImage: {
    url: string;
  };
}

interface ExploreSectionProps {
  posts: Post[];
}

export function ExploreSection({ posts }: ExploreSectionProps) {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="text-black mt-10 lg:mt-20 px-10 lg:px-20">
      <h3 className="text-3xl lg:text-5xl font-semibold">
        Explore <Link href="/blog/allposts"><span className="text-3xl text-[#E94C60]">(See All)</span></Link>
      </h3>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={windowWidth && windowWidth < 840 ? 1 : 3}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={2000}
        className="pt-10 pb-10"
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <CategoriesPostCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
