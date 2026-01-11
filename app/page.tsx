import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { SubscriptionsSection } from '@/components/sections/SubscriptionsSection';
import { ExpertsSection } from '@/components/sections/ExpertsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ProductCard } from '@/components/features/ProductCard';
import { featuredProduct } from '@/lib/constants';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-gray-50">
      <HeroSection />

      {/* Featured Product Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-[#E94C60]">Featured Product</h2>
          <div className="flex justify-center">
            <ProductCard
              product={{
                id: featuredProduct.id,
                name: featuredProduct.name,
                price: featuredProduct.price,
                image: featuredProduct.image,
                slug: featuredProduct.slug,
              }}
            />
          </div>
        </div>
      </section>

      <div className="w-full border-t border-[#E94C60]/20 my-8" />
      <WhyChooseUs />
      <div className="w-full border-t border-[#E94C60]/20 my-8" />
      <SubscriptionsSection />
      <div className="w-full border-t border-[#E94C60]/20 my-8" />
      <ExpertsSection />
      <div className="w-full border-t border-[#E94C60]/20 my-8" />
      <TestimonialsSection />
      <div className="w-full border-t border-[#E94C60]/20 my-8" />
      <ContactSection />
    </main>
  );
}
