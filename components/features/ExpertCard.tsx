import React from 'react';
import Image from 'next/image';
import { Expert } from '@/types';

interface ExpertCardProps {
  expert: Expert;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className="w-full lg:w-[30rem] lg:h-[30rem] h-[25rem]">
      <div className="flex items-center justify-center">
        {expert.image && (
          <Image
            loading="lazy"
            className="w-14 md:w-20 h-14 md:h-20 lg:w-40 lg:h-40 rounded-full"
            width={160}
            height={160}
            src={expert.image}
            alt={expert.name}
          />
        )}
      </div>
      <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-center pt-2 text-white">
        {expert.name}
      </h3>
      <h5 className="text-sm lg:text-xl font-semibold text-center pt-2 text-white">
        {expert.specialty}
      </h5>
      <p className="text-[12px] md:text-sm lg:text-sm pt-2 text-center mb-3 text-white">
        {expert.bio}
      </p>
    </div>
  );
}
