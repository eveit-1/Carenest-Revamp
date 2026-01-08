'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/constants';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full flex lg:inline-flex items-center flex-wrap px-0 lg:px-6 pl-4 border-b-2 shadow-lg h-auto lg:h-auto overflow-x-hidden pr-0 md:pr-10">
      {/* Logo */}
      <div className="w-20 lg:w-[30%]">
        <Link href="/" className="inline-block">
          <Image
            src="/images/CN6.png"
            alt="general wellness"
            width={100}
            height={100}
            className="h-auto w-auto max-h-16"
            priority
          />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="inline-flex p-3 rounded lg:hidden text-black ml-auto hover:text-black outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Nav Links - Desktop */}
      <div className="hidden w-full lg:w-[50%] justify-end lg:inline-flex lg:flex-grow shadow-xl ml-0 lg:ml-24 md:ml-10">
        <div className="lg:w-auto w-full flex lg:flex-row flex-col shadow-xl lg:h-auto">
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <span className="hidden lg:block w-2 h-2 bg-primary-red rounded-full mr-2" />
              <Link
                href={item.href}
                className={`font-bold m-2 text-[18px] py-3 px-1 text-gray-600 hover:underline underline-offset-8 hover:text-black hover:decoration-primary-red hover:decoration-4 ${
                  pathname === item.href ? 'text-black underline decoration-primary-red decoration-4' : ''
                }`}
              >
                {item.label}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="w-full lg:hidden mt-4 pb-4">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-bold py-3 px-4 text-gray-600 hover:text-black hover:bg-gray-50 ${
                  pathname === item.href ? 'text-black bg-gray-50' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
