import React from 'react';
import Image from 'next/image';
import { Expert } from '@/types';

interface ExpertCardProps {
  expert: Expert;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  // Determine card height based on expert name (some cards have different heights in the HTML)
  const isAnuradha = expert.name.toLowerCase().includes('anuradha');
  const isShreya = expert.name.toLowerCase().includes('shreya') && expert.specialty.toLowerCase().includes('psychologist');
  const isAmit = expert.name.toLowerCase().includes('amit');
  const isRajeshwari = expert.name.toLowerCase().includes('rajeshwari');
  const isJaisybai = expert.name.toLowerCase().includes('jaisybai');
  const isShreya2 = expert.name.toLowerCase().includes('shreya') && expert.specialty.toLowerCase().includes('physiotherapists');
  
  const cardHeight = (isShreya || isAmit || isShreya2) ? 'lg:h-[40rem] h-[38rem]' : 
                     isAnuradha ? 'lg:h-[32rem] h-[28rem]' : 
                     'lg:h-[36rem] h-[34rem]';
  
  return (
    <div className={`w-full lg:w-[30rem] ${cardHeight}`}>
      <div className="flex items-center justify-center">
        <Image
          alt=""
          src={expert.image || '/images/CN1.png'}
          width={expert.name.toLowerCase().includes('anuradha') || expert.name.toLowerCase().includes('rajeshwari') ? 100 : 250}
          height={expert.name.toLowerCase().includes('anuradha') || expert.name.toLowerCase().includes('rajeshwari') ? 100 : 250}
          className={`w-14 md:w-20 h-14 md:h-20 lg:w-40 lg:h-40 rounded-full ${expert.name.toLowerCase().includes('govind') ? 'mt-0' : ''}`}
          loading="lazy"
        />
      </div>
      <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-center pt-2">
        {expert.name}
      </h3>
      <h5 className={`text-sm ${expert.name.toLowerCase().includes('rajeshwari') ? 'md:text-md' : 'md:text-md'} lg:text-xl font-semibold text-center ${(isShreya || isAmit) ? 'pt-0 md:pt-2' : 'pt-2'}`}>
        {expert.specialty}
      </h5>
      <p className={`text-[12px] md:text-sm ${expert.name.toLowerCase().includes('anuradha') ? 'lg:text-sm' : 'lg:text-md'} pt-2 text-center ${(isRajeshwari || isJaisybai || isAmit || expert.specialty.toLowerCase().includes('physiotherapists')) ? 'mb-6' : 'mb-3'}`}>
        {expert.bio}
      </p>
    </div>
  );
}
