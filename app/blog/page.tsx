'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { FeaturedPostsSection } from '@/components/sections/FeaturedPostsSection';
import { BlogFeaturesSection } from '@/components/sections/BlogFeaturesSection';
import { ExploreSection } from '@/components/sections/ExploreSection';
import { blogPosts, featuredPosts } from '@/lib/blog-posts';

export default function BlogPage() {
  const [showSearch, setShowSearch] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<typeof blogPosts>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setFilteredPosts([]);
      return;
    }

    setFilteredPosts(
      blogPosts.filter((post) =>
        post.title.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="overflow-x-hidden">

      {/* Search Section */}
      <div className="px-6 md:px-10 lg:px-20 mt-10">
        <div className="relative inline-flex items-start gap-4">
          
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            aria-label="Search blogs"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-red text-white hover:opacity-90 transition"
          >
            <AiOutlineSearch className="text-2xl" />
          </button>

          {/* Search Input */}
          {showSearch && (
            <div className="relative bg-white rounded-lg shadow-md p-2 w-72">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  onChange={handleSearch}
                  className="flex-1 h-9 px-2 text-sm border border-gray-300 rounded outline-none focus:border-primary-red"
                />
                <IoClose
                  className="text-xl cursor-pointer text-gray-600 hover:text-black"
                  onClick={() => {
                    setShowSearch(false);
                    setFilteredPosts([]);
                  }}
                />
              </div>

              {/* Search Results */}
              {filteredPosts.length > 0 && (
                <div className="mt-2 max-h-56 overflow-y-auto border rounded">
                  {filteredPosts.map((post, i) => (
                    <Link
                      key={i}
                      href={`/blog/post/${post.slug}`}
                      className="block px-3 py-2 text-sm hover:bg-primary-green transition"
                      onClick={() => {
                        setShowSearch(false);
                        setFilteredPosts([]);
                      }}
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Featured Posts */}
      <FeaturedPostsSection posts={featuredPosts} />

      {/* Blog Features */}
      <BlogFeaturesSection posts={featuredPosts} />

      {/* Explore Blogs */}
      <ExploreSection posts={blogPosts.slice(0, 4)} />
    </div>
  );
}
