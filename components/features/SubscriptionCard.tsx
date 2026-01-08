import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Subscription } from '@/types';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-full flex flex-col">
      <div className="mb-4">
        {subscription.icon ? (
          <div className="w-16 h-16 mb-4">
            <Image
              src={subscription.icon}
              alt={subscription.title}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-primary-green/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-primary-green text-2xl">💊</span>
          </div>
        )}
      </div>
      <h5 className="text-lg font-semibold mb-2">{subscription.title}</h5>
      <h2 className="text-2xl font-bold text-primary-red mb-2">
        {subscription.price}
      </h2>
      {subscription.sessions && (
        <p className="text-sm text-gray-600 mb-4">{subscription.sessions}</p>
      )}
      <div className="mt-auto">
        <Link href="/appointment">
          <Button className="w-full">Subscribe</Button>
        </Link>
      </div>
    </div>
  );
}
