'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

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
    <Link href={`/products/${product.slug}`} className="block">
      <div className="relative overflow-hidden rounded-md bg-white shadow-md hover:shadow-lg transition-shadow">
        <div className="relative w-full h-64">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <h3 className="text-lg text-gray-700 mb-4">{formatPrice(product.price)}</h3>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
