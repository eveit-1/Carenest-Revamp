'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import { IoAccessibility } from 'react-icons/io5';
import { MdHealthAndSafety } from 'react-icons/md';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-white">

      {/* HERO */}
      <section className="relative">
        <Image
          src="/images/bg11.png"
          alt="About CareNest"
          width={1920}
          height={600}
          className="w-full h-[34vh] md:h-[42vh] object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              About Us
            </h1>
            <p className="mt-4 text-sm md:text-lg text-black leading-relaxed">
              CareNest is built by healthcare & technology professionals to make healthy
              living simple through expert advice, trusted products, and accessible
              telehealth solutions.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl md:text-4xl font-bold">
              Our Company Values
            </h2>
            <p className="mt-4 text-gray-600 text-sm md:text-lg">
              Committing to better healthcare experiences through trust,
              accessibility, and continuous improvement.
            </p>
          </div>

          {[
            {
              icon: <AiFillHeart size={28} />,
              title: 'Patient-Centric Care',
              desc: 'Every decision prioritizes patient well-being and outcomes.',
            },
            {
              icon: <IoAccessibility size={28} />,
              title: 'Accessibility',
              desc: 'Healthcare made available regardless of location or ability.',
            },
            {
              icon: <MdHealthAndSafety size={28} />,
              title: 'Transparency',
              desc: 'Clear, honest guidance on treatments and care options.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-lg bg-[#E94C60] text-white">
                {item.icon}
              </div>
              <h3 className="mt-4 font-semibold text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION / VISION / GOAL – IMPROVED */}
      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Making a Difference in Healthy Living
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-sm md:text-lg">
            Telehealth enables quick, reliable, and professional healthcare advice—
            helping people make informed decisions even in busy modern lifestyles.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Our Mission',
                desc: 'Deliver voice & video consultations with authentic, analysed health products.',
              },
              {
                title: 'Our Vision',
                desc: 'Build trust in telehealth advice in the digital healthcare era.',
              },
              {
                title: 'Our Goal',
                desc: 'Support all age groups with accessible professional healthcare guidance.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg text-[#E94C60]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP + INFO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.1374159804564!2d72.82072397495145!3d18.925310756686425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6fa0ca633fb7cbf5%3A0x2045f12383d3b87c!2sCareNest!5e0!3m2!1sen!2sin!4v1694078877509!5m2!1sen!2sin"
              className="w-full h-72 md:h-96"
              loading="lazy"
            />
          </div>

          {/* Side Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              Visit or Reach Us
            </h3>

            <div className="flex items-start gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-[#E94C60] mt-1" />
              <p className="text-sm md:text-base">
                CareNest Healthcare<br />
                Mumbai, Maharashtra, India
              </p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-[#E94C60]" />
              <a
                href="mailto:contact@carenest.in"
                className="text-sm md:text-base hover:underline"
              >
                contact@carenest.in
              </a>
            </div>

            <Link href="/#contact">
              <button className="mt-4 px-8 py-3 rounded-lg bg-[#9AB898] text-white font-semibold hover:opacity-90 transition">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
