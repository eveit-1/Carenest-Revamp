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
  const [showModal, setShowModal] = useState(false);
  const [filterValue, setFilterValue] = useState<typeof blogPosts>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    const filterArray = blogPosts?.filter((post) => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    if (searchValue === '') {
      setFilterValue([]);
    } else {
      setFilterValue(filterArray);
    }
  };

  return (
    <div className="App">
      <div className="px-10 lg:px-20 mt-10 md:mr-4 inline-flex">
        <div>
          <button
            className="float-left w-20 h-20"
            onClick={() => setShowModal(true)}
          >
            <AiOutlineSearch className="rounded-full w-12 h-12 p-2 bg-[#E94C60] text-white" />
          </button>
          {showModal ? (
            <>
              <div className="flex bg-white rounded-lg ml-2 mt-4 float-left">
                <div className="rounded-lg flex flex-inline pt-1 pl-1">
                  <input
                    type="text"
                    placeholder="Search ...."
                    onChange={handleSearch}
                    className="h-8 pl-2"
                  />
                  <IoClose
                    className="text-gray-600 text-3xl text-right cursor-pointer pt-1"
                    onClick={() => {
                      setShowModal(false);
                      setFilterValue([]);
                    }}
                  />
                </div>
                {filterValue.length !== 0 ? null : ''}
                <div className="rounded-lg border-2">
                  {filterValue.length !== 0 &&
                    filterValue.map((e, i) => {
                      return (
                        <div key={`searchResult${i}`} className="w-full p-2 hover:bg-[#9AB898]">
                          <Link href={`/blog/post/${e.slug}`}>{e.title}</Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div>
        <FeaturedPostsSection posts={featuredPosts} />
        <BlogFeaturesSection posts={featuredPosts} />
        <ExploreSection posts={blogPosts.slice(0, 4)} />
      </div>
    </div>
  );
}
