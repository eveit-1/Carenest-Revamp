'use client';

import React from 'react';
import Link from 'next/link';
import { Carousel } from '@/components/ui/Carousel';
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
  return (
    <div className="text-black mt-10 lg:mt-20 px-10 lg:px-20">
      <h3 className="text-3xl lg:text-5xl font-semibold">
        Explore{' '}
        <Link href="/blog/allposts">
          <span className="text-3xl text-primary-red">(See All)</span>
        </Link>
      </h3>
      <Carousel
        slidesPerView={1}
        spaceBetween={30}
        autoplay={true}
        showNavigation={true}
        showPagination={true}
        showSlideCounter={false}
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
        {posts.map((post, index) => (
          <CategoriesPostCard key={index} post={post} />
        ))}
      </Carousel>
    </div>
  );
}
