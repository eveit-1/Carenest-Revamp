'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: {
    url: string;
  };
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="relative flex items-center justify-center pt-10 lg:pt-10">
      <div>
        <Link href={`/blog/post/${post.slug}`}>
          <Image
            src={post.featuredImage.url}
            width={580}
            height={200}
            alt=""
            className="rounded-lg"
          />
        </Link>
        <div className="w-[95%] pl-4 pt-6">
          <p className="md:pr-5 mb-2 text-shadow font-semibold text-md lg:text-xl text-black">
            {post.title}
          </p>
          <div className="flex items-center justify-center">
            <p className="pr-5 align-middle text-black text-sm lg:text-md text-shadow font-medium">
              {post.excerpt.slice(0, 150)}
              <Link href={`/blog/post/${post.slug}`}>
                <span className="text-[#E94C60] font-semibold">Read more</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
