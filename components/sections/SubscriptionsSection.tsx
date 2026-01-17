import React from 'react';
import { Carousel } from '@/components/ui/Carousel';
import { SubscriptionCard } from '@/components/features/SubscriptionCard';
import { subscriptions } from '@/lib/constants';

export function SubscriptionsSection() {
  return (
    <div id="services">
      <h3 className="text-3xl md:text-4xl font-bold text-center pt-10 lg:pt-10 underline underline-offset-[8px] decoration-[#E94C60] decoration-4">
        Subscriptions
      </h3>
      <p className="text-sm md:text-lg font-semibold lg:font-regular text-gray-600 text-center pt-4 px-10 md:px-0">
        To Make It Consistent And See Results By Yourself!
      </p>
      <div id="serviceCards" className="w-[95%] md:w-[80%] m-auto">
        <div className="w-full">
          <Carousel
            slidesPerView={1}
            spaceBetween={0}
            autoplay={true}
            showNavigation={true}
            showPagination={true}
            showSlideCounter={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
          >
            {subscriptions.map((subscription) => (
              <SubscriptionCard key={subscription.id} subscription={subscription} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
