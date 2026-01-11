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
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/CN6.png"
              alt="CareNest"
              width={150}
              height={52}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Right Section (Nav + Cart) */}
          <div className="flex items-center gap-8">
            
            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-sm font-semibold transition-colors
                      ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'}
                    `}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[3px] rounded-full bg-primary-red transition-all
                        ${isActive ? 'w-full' : 'w-0 hover:w-full'}
                      `}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Cart (acts like nav item) */}
            <Link
              href="/cart"
              className="relative flex items-center text-gray-700 hover:text-black transition"
              aria-label="Shopping Cart"
            >
              <Image
                src="/images/shoppigcard (2).png"
                alt="shopping cart"
                width={26}
                height={26}
                className="h-6 w-6"
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
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
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
                className={`block rounded-lg px-4 py-3 text-sm font-semibold transition
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
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Image
              src="/images/shoppigcard (2).png"
              alt="shopping cart"
              width={22}
              height={22}
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
