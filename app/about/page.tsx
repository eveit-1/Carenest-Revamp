'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import { IoAccessibility } from 'react-icons/io5';
import { MdHealthAndSafety } from 'react-icons/md';

export default function AboutPage() {
  return (
    <div className="App overflow-x-hidden">
      {/* Hero Section with Background */}
      <div className="w-full relative">
        <div className="w-full">
          <Image
            src="/images/bg11.png"
            alt=""
            width={1920}
            height={600}
            className="w-full h-[32vh] md:h-[36vh] lg:h-auto object-cover"
          />
        </div>
        <div className="absolute top-2 px-4 md:px-10 lg:px-40 text-center pt-4 md:pt-14 lg:pt-20">
          <h3 className="text-2xl lg:text-4xl font-bold pt-2 md:pt-2">About Us</h3>
          <p className="hidden md:block text-sm lg:text-lg text-black text-center pt-1 md:pt-2 lg:pt-6">
            We, CareNest are healthcare & technology professionals who have come together to make a
            difference in healthy living and lifestyle. Our vision is to help all age groups and all
            genders, keeping in mind that everyone needs professional advice irrespective of the
            mentioned age, gender. We provide analyzed products with professional advice. We believe
            telehealth and advice can make a difference in healthy living making a difference in
            the lifestyle of our country. With telehealth, we can reach people with no restrictions
            and can approach the vast majority of people who lack professional advice, also in
            today&apos;s busy schedule in cities, it is important to opt for quick advice for
            healthy living, tele advice is quick, less time consuming and gives clarity. We develop
            worldclass technology platforms that is easy to use, impactful, mindful and creates a
            difference. Our aim is to help people take benfit of technology in their day to day
            healthcare needs with minimum effort and resources.
          </p>
          <p className="block md:hidden text-sm lg:text-lg text-black text-center pt-1 md:pt-2 lg:pt-6">
            We, CareNest are healthcare & technology professionals who have come together to make
            a difference in healthy living and lifestyle. We provide analyzed products with
            professional advice. Our aim is to help people take benfit of technology in their day
            to day healthcare needs with minimum effort and resources.
          </p>
        </div>
      </div>

      {/* Decorative Leaf */}
      <div className="relative">
        <Image
          src="/images/leaf1.png"
          alt=""
          width={200}
          height={200}
          className="hidden md:block absolute h-40 lg:h-60 right-0 -top-20"
        />
      </div>

      {/* Our Company Values Section */}
      <div className="w-[90%] lg:w-[85%] mx-auto flex flex-col md:flex-row gap-2 lg:gap-10 pt-0 lg:pt-0 overflow-x-hidden pb-10">
        <div className="w-[80%] mx-auto lg:w-[30%] pt-4 md:pt-10">
          <h3 className="w-full md:w-[80%] text-2xl lg:text-4xl font-bold pt-2">
            Our Company Values
          </h3>
          <p className="w-full md:w-[90%] text-sm lg:text-xl text-black text-left lg:text-gray-500 pt-2 md:pt-4 lg:pt-6">
            Committing to ongoing evaluation and improvement of processes, services, and products
            based on feedback, research, and best practices.
          </p>
        </div>

        {/* Patient-Centric Care Card */}
        <div className="container flex flex-col items-center text-center justify-center shadow-lg mt-6 p-4 lg:p-6 w-[80%] mx-auto lg:w-[20%] h-auto hover:bg-[#E94C60] hover:text-white rounded-lg transition-colors">
          <div className="cont square flex justify-center w-10 h-10 md:w-16 md:h-16 rounded-lg bg-[#E94C60] text-white p-1 md:p-4">
            <AiFillHeart className="w-8 h-8" />
          </div>
          <p className="text-lg hover:text-white font-bold pt-4">
            Patient-Centric
            <br />
            Care
            <br />
            <span className="text-[14px] lg:text-[16px] lg:font-normal text-gray-600 hover:text-white font-normal leading-2 pb-2">
              Putting patients&apos; needs and well-being at the forefront of all decisions and
              actions.
            </span>
          </p>
        </div>

        {/* Accessibility Card */}
        <div className="container flex flex-col items-center text-center justify-center shadow-lg mt-6 p-4 lg:p-6 w-[80%] lg:w-[20%] mx-auto h-auto hover:bg-[#E94C60] hover:text-white rounded-lg transition-colors">
          <div className="cont square flex justify-center w-10 h-10 md:w-16 md:h-16 rounded-lg bg-[#E94C60] text-white p-1 md:p-5">
            <IoAccessibility className="w-8 h-8" />
          </div>
          <p className="text-lg hover:text-white font-bold pt-2">
            Accessibility
            <br />
            <span className="text-[14px] lg:text-[16px] lg:font-normal text-gray-600 hover:text-white font-normal pb-2">
              Striving to make healthcare accessible to all, regardless of geographic location,
              socioeconomic status, or physical abilities.
            </span>
          </p>
        </div>

        {/* Transparency Card */}
        <div className="container flex flex-col items-center text-center justify-center shadow-lg mt-6 p-4 lg:p-6 w-[80%] lg:w-[20%] mx-auto h-auto hover:bg-[#E94C60] hover:text-white rounded-lg transition-colors">
          <div className="cont square flex justify-center w-10 h-10 md:w-16 md:h-16 rounded-lg bg-[#E94C60] text-white p-1 md:p-4">
            <MdHealthAndSafety className="w-8 h-8" />
          </div>
          <p className="text-lg hover:text-white font-bold pt-4">
            Transparency
            <br />
            <span className="text-[14px] lg:text-[16px] lg:font-normal text-gray-600 hover:text-white font-normal pb-2">
              Providing clear and honest information to patients about their healthcare options,
              costs, and treatment plans.
            </span>
          </p>
        </div>
      </div>

      {/* Decorative Leaf Left */}
      <div className="relative">
        <Image
          src="/images/leaf1.png"
          alt=""
          width={200}
          height={200}
          className="hidden md:block absolute h-40 lg:h-60 left-0 -top-24 z-1"
        />
      </div>

      {/* Contact Us Button */}
      <div className="pt-0 lg:pt-0 flex justify-center">
        <Link href="/#contact">
          <button className="h-12 px-4 lg:px-10 py-2 bg-[#9AB898] font-bold rounded-lg text-white transition duration-100 ease-in hover:bg-opacity-90">
            Contact Us
          </button>
        </Link>
      </div>

      {/* Mission, Vision, Goal Section */}
      <div className="w-full h-full relative pt-10 lg:pt-20 pb-44 md:pb-20 lg:pb-20">
        <Image
          src="/images/backg2.png"
          alt=""
          width={1920}
          height={800}
          className="w-full h-[50vh] md:h-[40vh] lg:h-auto object-cover"
        />

        <div className="absolute top-0 md:top-6 lg:top-0 px-4 md:px-10 lg:px-40 text-center pt-10 lg:pt-24 text-white pb-10 lg:pb-20">
          <h3 className="text-2xl lg:text-4xl font-bold text-white pt-4">
            Making a difference in healthy living and lifestyle
          </h3>
          <p className="w-[95%] md:w-[60%] mx-auto overflow-x-hidden text-white text-sm lg:text-lg text-justify md:text-center pt-2 lg:pt-6">
            We believe Telehealth and advice can make a difference in healthy living making a
            difference in the lifestyle of our country. With Telehealth, we can reach people with
            no restrictions and can approach the vast majority of people who lack professional
            advice, also in today&apos;s busy schedule in cities, it is important to opt for quick
            advice for healthy living, tele advice is quick, less time consuming and gives clarity.
          </p>

          <div className="w-full md:w-[90%] h-40 mx-auto items-center justify-center flex gap-2 md:gap-14 text-black pt-20 md:pt-20 lg:pt-14">
            {/* Our Mission Card */}
            <div className="container flex flex-col items-center bg-white text-center justify-center shadow-lg mt-0 md:mt-10 lg:mt-36 p-2 lg:p-6 w-full lg:w-[25%] h-auto md:h-52 rounded-lg">
              <p className="text-sm md:text-xl font-bold">Our Mission</p>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] lg:font-normal text-center text-gray-600 font-normal leading-2 pb-2 pt-2">
                Call, Voice & Video consultations, authentic & analysed products for better
                wellbeing.
              </p>
            </div>

            {/* Our Vision Card */}
            <div className="container flex flex-col items-center text-black bg-white text-center justify-center shadow-lg mt-0 lg:mt-14 p-2 lg:p-6 w-full lg:w-[25%] h-auto md:h-52 rounded-lg">
              <p className="text-sm md:text-xl font-bold">Our Vision</p>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] lg:font-normal text-gray-600 text-center font-normal pb-2 pt-4 px-2">
                To build trust in advise given on Telehealth in the Digital Era.
              </p>
            </div>

            {/* Our Goal Card */}
            <div className="container flex flex-col items-center text-black bg-white text-center justify-center shadow-lg mt-0 md:mt-10 lg:mt-36 p-2 lg:p-6 w-full lg:w-[25%] h-auto md:h-52 rounded-lg">
              <p className="text-sm md:text-xl font-bold">Our Goal</p>
              <p className="text-[12px] md:text-[14px] lg:text-[16px] lg:font-normal text-center text-gray-600 font-normal pb-2 pt-2">
                Goal - To help all age group and all gender keeping in mind that everyone needs
                professional advices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="relative mt-0 md:mt-10 lg:mt-20 pt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.1374159804564!2d72.82072397495145!3d18.925310756686425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6fa0ca633fb7cbf5%3A0x2045f12383d3b87c!2sCareNest!5e0!3m2!1sen!2sin!4v1694078877509!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: '0' }}
          allowFullScreen={true}
          loading="lazy"
          className="w-full md:h-96 h-64 p-0 rounded"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
