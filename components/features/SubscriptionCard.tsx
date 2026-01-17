import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Subscription } from '@/types';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  // Parse price for mental health care special formatting
  const isMentalHealth = subscription.title.toLowerCase().includes('mental health');
  
  return (
    <div className="min-w-[40vw] min-h-[28rem] p-10 m-10 mx-auto md:min-w-[50%] lg:min-w-[20%] flex justify-center">
      <div id="serviceCard2" className="card w-full h-full rounded-b-md border-b-8 shadow-xl border-b-[#E94C60] text-center p-2 flex flex-col">
        <div className="flex item-center justify-center">
          <Image
            alt="nutrition"
            src={subscription.icon || '/images/1.png'}
            width={subscription.title.toLowerCase().includes('mental') ? 120 : subscription.title.toLowerCase().includes('mother') ? 140 : 150}
            height={subscription.title.toLowerCase().includes('mental') ? 120 : subscription.title.toLowerCase().includes('mother') ? 140 : 150}
            loading="lazy"
          />
        </div>
        <h5 className="text-lg md:text-xl font-bold uppercase pt-2">
          {subscription.title}
        </h5>
        <div className="flex-grow">
          {isMentalHealth ? (
            <h2 className="font-bold text-lg md:text-lg pt-4 pb-0">
              <i className="fa fa-inr"></i>₹ 1999{' '}
              <span className="text-sm md:text-lg font-normal">(2 sessions)</span>
              <br />
              ₹ 3099{' '}
              <span className="text-sm md:text-md font-normal">(3 sessions)</span>
              <br />
              ₹ 5099{' '}
              <span className="text-sm md:text-md font-normal">(5 sessions)</span>
            </h2>
          ) : (
            <>
              <h2 className={`font-bold text-lg md:text-xl ${subscription.title.toLowerCase().includes('skin') ? 'pt-6' : 'pt-4'} pb-0`}>
                <i className="fa fa-inr"></i>
                {subscription.price}
              </h2>
              <span className={`text-sm ${subscription.title.toLowerCase().includes('skin') ? 'md:text-md pt-2' : 'md:text-lg'}`}>
                {subscription.sessions}
              </span>
            </>
          )}
        </div>
        <div className="md:pb-4 mt-4">
          <Link href="/appointment">
            <button className="text-xl w-40 md:w-52 md:h-12 text-white px-4 py-2 bg-[#9AB898] rounded-md">
              Subscribe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
