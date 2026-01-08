import React from 'react';
import Image from 'next/image';
import { Carousel } from '@/components/ui/Carousel';
import { ExpertCard } from '@/components/features/ExpertCard';
import { experts } from '@/lib/constants';

export function ExpertsSection() {
  return (
    <>
      {/* Decorative Leaf Image */}
      <div className="relative">
        <Image
          src="/images/leaff.png"
          alt=""
          width={200}
          height={200}
          className="w-20 h-20 md:w-40 lg:w-40 md:h-40 lg:h-52 absolute left-0"
        />
      </div>
      
      <section className="star w-full mt-0 md:mt-6 lg:pt-10 px-6 text-white md:px-10">
        <div className="container mx-auto">
          <h3 className="text-2xl md:text-4xl font-bold text-white text-center underline underline-offset-[8px] decoration-[#E94C60] decoration-4 pt-10 md:pt-10 lg:pt-0">
            Our All-Star Experts
          </h3>
          <p className="text-lg md:text-lg font-semibold lg:font-regular text-white text-center pt-4 px-10 md:px-0">
            We strive to offer you the best medical assistance from the best counsellors in India.
          </p>

          <div className="flex flex-row mt-4 lg:mt-10">
            <div className="w-full pl-0 lg:pl-10 lg:w-[45%] mx-auto">
              <Carousel
                slidesPerView={1}
                spaceBetween={30}
                autoplay={false}
                showNavigation={true}
                showPagination={true}
                showSlideCounter={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                }}
              >
                {experts.map((expert) => (
                  <ExpertCard key={expert.id} expert={expert} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
