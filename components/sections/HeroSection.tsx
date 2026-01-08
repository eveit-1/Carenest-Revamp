import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productCategories } from '@/lib/constants';

export function HeroSection() {
  return (
    <>
      {/* Video Hero Section */}
      <section className="carousel-container relative overflow-hidden">
        <div className="h-full lg:h-[85vh] mb-10 md:mb-10 flex items-center justify-center relative pt-0 md:pt-0">
          <video
            className="w-full rounded-md"
            src="/images/carnestvdo.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </section>

      {/* CTA Buttons Section */}
      <div className="relative overflow-hidden -mt-10">
        <div className="mx-auto w-full justify-center text-center">
          <Link href="/appointment">
            <button className="mx-2 md:m-3 p-3 text-sm md:text-xl w-40 md:w-52 lg:w-72 h-10 lg:h-14 text-white px-4 py-2 mt-4 md:mt-12 lg:mt-14 bg-primary-green rounded-lg hover:bg-opacity-90 transition-colors">
              Book Consultation
            </button>
          </Link>
          <Link href="/product">
            <button className="mx-2 md:m-3 p-3 text-sm md:text-xl w-40 md:w-52 lg:w-72 h-10 lg:h-14 text-white px-4 py-2 mt-4 lg:mt-14 bg-primary-green rounded-lg hover:bg-opacity-90 transition-colors">
              Our Product
            </button>
          </Link>
          
          {/* Decorative Images */}
          <Image
            src="/images/image-removebg-preview (8).png"
            alt=""
            width={300}
            height={300}
            className="absolute left-[80%] top-[30%] md:left-[75%] h-[50%] w-[30%] md:h-[90%] md:w-[25%] hidden md:block"
          />
          <Image
            src="/images/image-removebg-preview (9).png"
            alt=""
            width={200}
            height={200}
            className="absolute w-[20%] md:h-[50%] md:w-[15%] left-[3%] md:left-[5%] top-[40%] hidden md:block"
          />
        </div>

        {/* Hero Title and Subtitle */}
        <div className="text-center mt-10 lg:mt-16 mx-8">
          <h1 className="text-3xl md:text-5xl font-bold">CareNest</h1>
          <p className="w-full lg:w-[40%] mx-auto text-sm md:text-lg text-gray-400 pt-2">
            A tasty way to get your daily vitamins.
          </p>
        </div>

        {/* Product Category Navigation */}
        <div className="mt-8">
          <nav className="w-[50%] text-center md:w-[50%] lg:w-[25%] m-auto bg-[#E94C60] rounded-full px-2 p-2">
            <ul className="list-none flex flex-row justify-around">
              <li className="px-2 py-1 md:px-8 md:py-2">
                <Link
                  className="text-sm md:text-lg text-white hover:text-black font-bold m-auto"
                  href="/product"
                >
                  Multi Vitamin Gummies
                </Link>
              </li>
              <li className="hidden hover:bg-white hover:rounded-full px-1 py-1 md:px-8 md:py-2">
                <a
                  className="text-sm md:text-lg text-[#69242e] hover:text-black font-bold m-auto"
                  href="#"
                >
                  Hair
                </a>
              </li>
              <li className="hidden hover:bg-white hover:rounded-full px-1 py-1 md:px-8 md:py-2">
                <a
                  className="text-sm md:text-lg text-[#69242e] hover:text-black font-bold m-auto"
                  href="#"
                >
                  Skin
                </a>
              </li>
              <li className="hidden hover:bg-white hover:rounded-full px-1 py-1 md:px-8 md:py-2">
                <a
                  className="text-sm md:text-lg text-[#69242e] hover:text-black font-bold m-auto"
                  href="#"
                >
                  Body
                </a>
              </li>
              <li className="hidden hover:bg-white hover:rounded-full px-1 py-1 md:px-8 md:py-2">
                <a
                  className="text-sm md:text-lg text-[#69242e] hover:text-black font-bold m-auto"
                  href="#"
                >
                  Beard
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Decorative Leaf Image */}
      <div className="relative">
        <Image
          src="/images/leaf2.png"
          alt=""
          width={200}
          height={200}
          className="hidden md:block absolute h-40 lg:h-60 right-0 mt-96"
        />
      </div>
    </>
  );
}
