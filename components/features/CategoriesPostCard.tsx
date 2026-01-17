'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  featuredImage: {
    url: string;
  };
}

interface CategoriesPostCardProps {
  post: Post;
}

export function CategoriesPostCard({ post }: CategoriesPostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="relative h-1/2 mt-4 lg:mt-8 mx-0 lg:mx-10">
      <div className="rounded-lg">
        <Link href={`/blog/post/${post.slug}`}>
          <Image
            alt={post.title}
            width={800}
            height={500}
            className="rounded"
            src={post.featuredImage.url}
          />
        </Link>
      </div>
      <div className="flex flex-col rounded-lg p-4 mt-4">
        <p className="text-black mb-4 text-shadow font-semibold text-xl">
          <Link href={`/blog/post/${post.slug}`}>{post.title}</Link>
        </p>
        <p className="align-middle text-black text-sm text-shadow font-medium">
          {post.excerpt}
          <Link href={`/blog/post/${post.slug}`}>
            <span className="text-[#E94C60] font-semibold ml-3 mt-2">Read More ➡️</span>
          </Link>
        </p>
        <p className="text-black mb-4 mt-4 bottom-2 font-semibold text-xs">
          {formatDate(post.createdAt)}
        </p>
      </div>
    </div>
  );
}
