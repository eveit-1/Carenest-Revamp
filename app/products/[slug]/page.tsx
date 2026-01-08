'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { featuredProduct } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { addItem } = useCart();

  // In a real app, fetch product by slug
  if (params.slug !== 'careNest-multivitamin') {
    notFound();
  }

  const product = {
    id: featuredProduct.id,
    name: featuredProduct.name,
    price: featuredProduct.price,
    image: featuredProduct.image,
    slug: featuredProduct.slug,
    description:
      'CareNest Multivitamin Gummies are packed with essential vitamins and minerals to support your daily health needs.',
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
    });
  };

  return (
    <div className="py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-primary-red font-bold mb-6">
              {formatPrice(product.price)}
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>
            <Button onClick={handleAddToCart} className="w-full md:w-auto px-8 py-3">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
