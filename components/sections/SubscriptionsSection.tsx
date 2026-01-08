import React from 'react';
import { Carousel } from '@/components/ui/Carousel';
import { SubscriptionCard } from '@/components/features/SubscriptionCard';
import { subscriptions } from '@/lib/constants';

export function SubscriptionsSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-4">Subscriptions</h3>
        <p className="text-center mb-12 text-gray-600">
          To Make It Consistent And See Results By Yourself!
        </p>

        <div className="slider-frame pb-0 md:p-8">
          <Carousel
            slidesPerView={1}
            spaceBetween={30}
            autoplay={true}
            showNavigation={true}
            showPagination={true}
            showSlideCounter={true}
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
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {subscriptions.map((subscription) => (
              <SubscriptionCard key={subscription.id} subscription={subscription} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
