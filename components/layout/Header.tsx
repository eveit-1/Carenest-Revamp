'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from './Navbar';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <Navbar />
      <div className="flex justify-end pr-4 md:pr-10 py-2">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-gray-600 hover:text-black relative"
        >
          <Image
            src="/images/shoppigcard (2).png"
            alt="shopping card"
            width={30}
            height={30}
            className="m-auto pl-2 md:pl-0 pt-4"
          />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="hidden md:inline">Shopping Cart</span>
        </Link>
      </div>
    </header>
  );
}
