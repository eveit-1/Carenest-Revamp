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
    <>
      <HeroSection />

      {/* Featured Product Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto">
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
      </section>

      <WhyChooseUs />
      <SubscriptionsSection />
      <ExpertsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
