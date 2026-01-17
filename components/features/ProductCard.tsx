'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <div className="w-[90%] mx-auto max-w-[250px] bg-[#E94C60] h-auto mb-6 cursor-pointer hover:shadow-lg rounded-lg flex flex-col">
      <Link href={`/products/${product.slug}`}>
        <div className="w-full relative">
          <div className="w-full flex flex-row -mt-6 md:-mt-10">
            <div className="w-[100%]">
              <Image
                alt="productimage"
                src={product.image}
                width={300}
                height={300}
                className=""
                loading="lazy"
              />
            </div>
          </div>
          <div className="bg-gray-100 w-full text-center py-4">
            <h3 className="text-md md:text-xl line-clamp-2 font-semibold pb-2">
              {product.name}
            </h3>
            <h3 className="text-md md:text-xl text-[#E94C60] line-clamp-2 font-semibold">
              MRP {product.price}/-
            </h3>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="text-white text-xl" onClick={handleAddToCart}>
              Add to Cart
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
