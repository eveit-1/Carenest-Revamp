'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from '@/components/ui/Carousel';
import { ProductCard } from '@/components/features/ProductCard';
import { featuredProduct, productCategories } from '@/lib/constants';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2';

export default function ProductPage() {
  const { addItem } = useCart();
  const [isMuted, setIsMuted] = useState(true);
  const [isMuted1, setIsMuted1] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleMute1 = () => {
    setIsMuted1(!isMuted1);
    if (videoRef1.current) {
      videoRef1.current.muted = !isMuted1;
    }
  };

  const toggleMute2 = () => {
    setIsMuted2(!isMuted2);
    if (videoRef2.current) {
      videoRef2.current.muted = !isMuted2;
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      quantity: 1,
      image: featuredProduct.image,
      slug: featuredProduct.slug,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to cart
    window.location.href = '/cart';
  };

  const products = [featuredProduct];

  const featureBadges = [
    {
      image: '/images/Frame 940.png',
      text: 'VEGETARIAN & CRUELTY FREE',
      color: '#9AB898',
    },
    {
      image: '/images/Frame 941.png',
      text: 'GELATIN & GLUTEN FREE',
      color: '#E94C60',
    },
    {
      image: '/images/Frame 943.png',
      text: 'NO SIDEEFFECTS',
      color: '#FFCFAB',
    },
    {
      image: '/images/Frame 942.png',
      text: 'FOR HIM & HER',
      color: '#FFA3A2',
    },
    {
      image: '/images/Frame 945.png',
      text: 'CLINICALLY TESTED',
      color: '#E94C60',
    },
  ].filter((badge) => {
    // Filter out badges if images don't exist - will use placeholder
    return true;
  });

  const howItWorks = [
    {
      image: '/images/Ellipse 287.png',
      title: 'Buy Our Multivitamin Gummies',
      description: 'Convenient way to get your daily dose of essential vitamins and minerals.',
    },
    {
      image: '/images/Ellipse 288.png',
      title: 'Book a Free Consultation',
      description: 'A one-on-one interaction, conversation, meeting, or interview.',
    },
    {
      image: '/images/Ellipse 286.png',
      title: 'Get Expert Advice & Professional Consultation',
      description: 'Seeking guidance from those with experience can help you achieve your goals faster.',
    },
  ];

  const ingredients = [
    {
      icon: '/images/Vector.png',
      iconBg: '#9AB989',
      title: 'Ashwagandha Root Power',
      description: 'Better mood, memory, less stress, less anxiety, good muscle strength',
      align: 'right',
    },
    {
      icon: '/images/Frame 952.png',
      iconBg: '#FFCFAB',
      title: 'Antioxidants and Minerals',
      description: 'Green Tea extract, Black elderberry, Zinc, Sodium, Iodine',
      align: 'right',
    },
    {
      icon: '/images/Frame 951.png',
      iconBg: '#FFA3A2',
      title: 'Vitamin B12, B5, B6, B7 ,B9',
      description: 'Summed up B complex, the complete vitamin care! Good eye sight, better nerve and brain function! Good immunity.',
      align: 'left',
    },
  ];

  return (
    <div className="App overflow-x-hidden">
      {/* Hero Carousel */}
      <section className="carousel-container relative">
        <Carousel
          slidesPerView={1}
          spaceBetween={0}
          autoplay={true}
          showNavigation={true}
          showPagination={true}
          showSlideCounter={false}
        >
          <div className="w-full">
            <Link href="/product">
              <Image
                className="w-full h-full lg:h-[80vh] object-cover"
                loading="lazy"
                width={1500}
                height={500}
                src="/images/CN9.png"
                alt="CareNest Product"
              />
            </Link>
          </div>
          <div className="w-full">
            <Link href="/product">
              <Image
                className="w-full h-full lg:h-[80vh] object-cover"
                loading="lazy"
                width={1500}
                height={600}
                src="/images/CN10.png"
                alt="CareNest Product"
              />
            </Link>
          </div>
        </Carousel>
      </section>

      {/* Decorative Half Circle */}
      <Image
        className="absolute rotate-180 w-[10%] md:w-[7%] lg:w-[5%] md:mt-10"
        src="/images/a.png"
        alt="halfcircle"
        width={100}
        height={100}
      />

      {/* Main Content */}
      <div className="w-full md:w-[80%] mx-auto pt-10 lg:pt-20 pb-10 px-4 md:px-0">
        {/* Hero Text */}
        <h5 className="text-2xl lg:text-5xl font-bold text-black text-center">
          Vitamins never tasted this good!
        </h5>
        <p className="text-sm lg:text-xl text-center pt-4">
          Try our multi-vitamin gummies for a tasty way to get your daily vitamins.
        </p>

        {/* Feature Badges */}
        <div className="relative w-full lg:w-full flex flex-wrap pt-10 items-center justify-center">
          {featureBadges.map((badge, index) => (
            <div key={index} className="w-[50%] md:w-[20%] flex items-center justify-center">
              <div>
                <Image
                  className="mx-auto p-4 md:p-0"
                  src={badge.image}
                  alt={badge.text}
                  width={100}
                  height={100}
                />
                <p
                  className="text-sm md:text-lg font-semibold pt-0 md:pt-4 text-center"
                  style={{ color: badge.color }}
                >
                  {badge.text.split(' & ').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < badge.text.split(' & ').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Carousel */}
        <div className="w-[70%] md:w-full mx-auto relative mt-6 mb-6 md:mb-10 items-center justify-center gap-0 pt-0 md:pt-0">
          <Carousel
            slidesPerView={1}
            spaceBetween={30}
            autoplay={true}
            showNavigation={true}
            showPagination={true}
            showSlideCounter={false}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            <div className="w-full md:w-[85%] h-full relative flex flex-col pl-6">
              <video
                ref={videoRef}
                className="rounded-lg"
                src="/images/influencer22.mp4"
                autoPlay
                loop
                muted={isMuted}
                onClick={toggleMute}
                playsInline
              />
              <button className="absolute top-0 left-6" onClick={toggleMute}>
                {isMuted ? (
                  <HiMiniSpeakerXMark className="text-4xl text-white" />
                ) : (
                  <HiMiniSpeakerWave className="text-4xl text-white" />
                )}
              </button>
            </div>
            <div className="w-full md:w-[85%] h-full relative flex flex-col pl-6">
              <video
                ref={videoRef1}
                className="rounded-lg"
                src="/images/influencervdo.mov"
                autoPlay
                loop
                muted={isMuted1}
                onClick={toggleMute1}
                playsInline
              />
              <button className="absolute top-0 left-6" onClick={toggleMute1}>
                {isMuted1 ? (
                  <HiMiniSpeakerXMark className="text-4xl text-white" />
                ) : (
                  <HiMiniSpeakerWave className="text-4xl text-white" />
                )}
              </button>
            </div>
            <div className="w-full md:w-[85%] h-full relative flex flex-col pl-6">
              <video
                ref={videoRef2}
                className="rounded-lg"
                src="/images/influencer3(1).mp4"
                autoPlay
                loop
                muted={isMuted2}
                onClick={toggleMute2}
                playsInline
              />
              <button className="absolute top-0 left-6" onClick={toggleMute2}>
                {isMuted2 ? (
                  <HiMiniSpeakerXMark className="text-4xl text-white" />
                ) : (
                  <HiMiniSpeakerWave className="text-4xl text-white" />
                )}
              </button>
            </div>
          </Carousel>
        </div>
      </div>

      {/* Decorative Half Circle Right */}
      <Image
        className="absolute right-0 float-right w-[10%] md:w-[7%] lg:w-[5%] -mt-28 md:mt-0"
        src="/images/a.png"
        alt="halfcircle"
        width={100}
        height={100}
      />

      {/* Product Categories Navigation */}
      <div className="w-full">
        <div className="">
          <nav className="w-[50%] text-center md:w-[50%] lg:w-[20%] m-auto bg-[#E94C60] rounded-full px-2 p-2">
            <ul className="list-none flex flex-row justify-around">
              <li className="px-2 py-1 md:px-8 md:py-2">
                <a
                  className="text-sm md:text-lg text-white hover:text-black font-bold m-auto"
                  href="#"
                >
                  Multivitamin gummies
                </a>
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

        {/* Product Display Section */}
        <div className="relative my-10 pb-28 md:pb-52 lg:pb-20 overflow-hidden">
          <div className="">
            <Image
              src="/images/bg11.png"
              alt=""
              width={1920}
              height={800}
              className="w-full h-[100vh] md:h-[85vh] lg:h-[80vh] object-cover"
            />
          </div>
          <div className="absolute w-full -top-4 m-auto text-center">
            <div className="w-full lg:w-[80%] mx-auto text-black overflow-x-hidden relative z-0">
              <div className="w-[90%] mx-auto max-w-[250px] bg-white h-auto mb-6 cursor-pointer hover:shadow-lg rounded-lg flex flex-col">
                <div className="w-full relative">
                  <div className="w-full flex flex-row -mt-6 md:-mt-10">
                    <div className="w-full">
                      <Image
                        src={featuredProduct.image}
                        width={300}
                        height={300}
                        alt="productimage"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-100 w-full text-center py-4">
                    <h3 className="text-md md:text-xl line-clamp-2 font-semibold pb-2">
                      {featuredProduct.name}
                    </h3>
                    <h3 className="text-md md:text-xl text-[#E94C60] line-clamp-2 font-semibold">
                      MRP {formatPrice(featuredProduct.price)}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center py-4 gap-2">
                    <button
                      onClick={handleBuyNow}
                      className="bg-[#9AB898] text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
                    >
                      Buy now
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="bg-[#9AB898] text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full lg:w-[70%] mx-auto px-10 md:px-0">
          <h3 className="text-xl md:text-2xl font-bold text-center pt-0 md:pt-0 text-[#E94C60]">
            Get Started!
          </h3>
          <h3 className="text-2xl md:text-4xl font-bold text-center pt-0">
            How It Works?
          </h3>
          <p className="w-full md:w-[35%] mx-auto text-center pt-4 text-sm lg:text-lg text-gray-500">
            Our multi-vitamin gummies for a healthy lifestyle
          </p>
          <div className="w-full md:flex items-center justify-center pt-10 pl-0 md:pl-10">
            {howItWorks.map((step, index) => (
              <React.Fragment key={index}>
                <div className="w-full md:w-[25%]">
                  <div className="flex items-center justify-center">
                    <Image src={step.image} alt="step" width={200} height={200} />
                  </div>
                  <p className="text-sm lg:text-lg text-center font-semibold pt-4">
                    {step.title}
                  </p>
                  <p className="text-sm text-center pt-4">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block w-[15%] border-2 border-dashed border-[#9AB989] -mt-24"></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-center pt-10">
            <Link href="/appointment">
              <button className="bg-[#E94C60] text-white px-8 py-2 rounded-lg text-lg h-14 hover:bg-opacity-90 transition-colors">
                Free Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Leaf */}
        <Image
          className="absolute rotate-180 mt-10 w-[10%] md:w-[7%] lg:w-[5%]"
          src="/images/leaf1.png"
          alt="halfcircle"
          width={100}
          height={100}
        />

        {/* Real Ingredients Section */}
        <div className="gummy w-full mt-20 md:mt-20">
          <div className="w-full md:w-[70%] mx-auto pt-0 md:pt-10 px-10 md:px-0 pb-0 md:pb-20">
            <h3 className="text-xl md:text-2xl font-bold text-center pt-10 md:pt-0 text-[#E94C60]">
              Real Ingredients!
            </h3>
            <h3 className="text-2xl md:text-4xl font-bold text-center pt-0">
              Only The Good Stuff
            </h3>
            <div className="w-full md:flex gap-10 pt-0 lg:pt-10">
              {/* Left Column */}
              <div className="w-full md:w-[30%] flex items-right justify-end pt-4 md:pt-10">
                <div>
                  {ingredients
                    .filter((ing) => ing.align === 'right')
                    .map((ingredient, index) => (
                      <div key={index} className="mb-10">
                        <div className="float-right">
                          <Image
                            className="rounded-full w-12 h-12 p-2"
                            src={ingredient.icon}
                            alt={ingredient.title}
                            width={48}
                            height={48}
                            style={{ backgroundColor: ingredient.iconBg }}
                          />
                        </div>
                        <h5 className="text-xl font-bold text-black text-right pt-14">
                          {ingredient.title}
                        </h5>
                        <p className="text-md text-right">{ingredient.description}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Center - Gummy Image */}
              <div className="w-full md:w-[30%] rounded-full p-6 lg:p-2 flex items-center justify-center mt-0 md:mt-0">
                <div className="w-full h-full flex items-center justify-center">
                  <Image src="/images/image 9.png" alt="gummy" width={300} height={300} />
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-[30%]">
                <div className="pt-0 md:pt-10">
                  <div className="rounded-full w-12 h-12 float-left text-white font-semibold bg-[#E94C60] text-center p-3">
                    Vit
                  </div>
                  <h5 className="text-xl font-bold text-black text-left pt-14">
                    Biotin, Vit E, Vit C , Vit A
                  </h5>
                  <p className="text-md text-left">Good Skin and Hair.</p>

                  {ingredients
                    .filter((ing) => ing.align === 'left')
                    .map((ingredient, index) => (
                      <div key={index} className="pt-10 float-left">
                        <Image
                          className="rounded-full w-12 h-12 p-2"
                          src={ingredient.icon}
                          alt={ingredient.title}
                          width={48}
                          height={48}
                          style={{ backgroundColor: ingredient.iconBg }}
                        />
                        <h5 className="text-xl font-bold text-black text-left pt-24">
                          {ingredient.title}
                        </h5>
                        <p className="text-md text-left">{ingredient.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
