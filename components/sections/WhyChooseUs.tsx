import React from 'react';
import Image from 'next/image';
import { features } from '@/lib/constants';

export function WhyChooseUs() {
  return (
    <section className="relative text-center h-auto overflow-hidden">
      {/* Background Image */}
      <div className="relative">
        <Image
          src="/images/bg11.png"
          alt=""
          width={1920}
          height={600}
          className="w-full h-[60vh] md:h-[35vh] lg:h-auto object-cover"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute w-full top-4 lg:top-10 m-auto text-center">
        <h1 className="text-2xl md:text-4xl font-bold underline underline-offset-[8px] decoration-[#E94C60] decoration-4">
          Why Choosing Us
        </h1>
        <p className="text-sm md:text-lg text-gray-600 mt-4">
          Because we have plan for your better health!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-10 w-[95%] lg:w-[80%] mt-4 md:mt-6 lg:mt-14 mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:justify-center text-center">
              {feature.icon && (
                <div className={`w-[25%] p-2 mx-auto`} style={{ backgroundColor: feature.bgColor || '#D9D9D9' }}>
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="m-auto w-8 h-4 md:h-4 lg:h-10 object-contain"
                  />
                </div>
              )}
              <h1 className="text-sm lg:text-xl font-semibold m-2 md:m-4">{feature.title}</h1>
              <p className="text-[12px] md:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
