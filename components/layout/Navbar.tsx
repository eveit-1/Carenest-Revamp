'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/constants';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-gray-200">
      
      {/* Wider container */}
      <div className="max-w-[1400px] mx-auto px-2 lg:px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo (More Left + Bigger) */}
          <Link href="/" className="flex items-center ml-0">
            <Image
              src="/images/CN6.png"
              alt="CareNest"
              width={190}
              height={70}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-12">

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-base font-semibold transition-colors
                      ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'}
                    `}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-2 h-[3px] rounded-full bg-primary-red transition-all
                        ${isActive ? 'w-full' : 'w-0 hover:w-full'}
                      `}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center text-gray-700 hover:text-black transition"
              aria-label="Shopping Cart"
            >
              <Image
                src="/images/shoppigcard (2).png"
                alt="shopping cart"
                width={30}
                height={30}
                className="h-7 w-7"
              />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96 border-t border-gray-200' : 'max-h-0'}
        `}
      >
        <div className="px-4 py-4 space-y-2 bg-white">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-4 py-3 text-base font-semibold transition
                  ${
                    isActive
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Mobile Cart */}
          <Link
            href="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Image
              src="/images/shoppigcard (2).png"
              alt="shopping cart"
              width={24}
              height={24}
            />
            Shopping Cart
            {itemCount > 0 && (
              <span className="ml-auto bg-primary-red text-white text-xs font-bold rounded-full px-2 py-0.5">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
