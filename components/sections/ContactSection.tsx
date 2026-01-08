'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-main flex mt-0 md:mt-10 lg:mt-20 pl-10 lg:pl-20 pt-0 md:pt-10 lg:pt-20 -mb-20"
    >
      <div className="w-full lg:w-50% lg:my-0 pl-0 pr-10 lg:pr-40">
        <div className="pt-10">
          <h2 className="mr-2 font-bold text-4xl lg:text-5xl">
            Contact <span className="text-[#9AB898]">Us</span>
          </h2>
          <p className="text-sm lg:text-lg font-semibold lg:font-regular text-gray-500 pt-4">
            Helping you is our top most priority.
          </p>
          <p className="text-sm lg:text-lg font-semibold lg:font-medium text-gray-500 mt-6 mb-0">
            We are ready to solve all your genuine queries within 48 hours.
          </p>
        </div>

        <div className="pb-20 md:pb-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="ml-auto lg:flex w-full mx-8">
              <div className="text-centre lg:w-1/2 mt-6 lg:mr-3">
                <input
                  type="text"
                  className="p-2 rounded w-full h-10 lg:h-14 text-sm md:text-[1rem] border-2 border-[#E94C60]"
                  placeholder="Your Name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="lg:w-1/2 mt-6 lg:ml-3">
                <input
                  type="email"
                  className="p-2 rounded w-full text-sm md:text-[1rem] h-10 lg:h-14 border-2 border-[#E94C60]"
                  placeholder="Email id"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="ml-auto lg:flex w-full m-8">
              <div className="lg:w-1/2 mt-6 lg:mr-3">
                <input
                  type="tel"
                  className="p-2 rounded w-full h-10 lg:h-14 text-sm md:text-[1rem] border-2 border-[#E94C60]"
                  placeholder="Phone Number (e.g: 9876543210)"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div className="lg:w-1/2 mt-6 lg:ml-3">
                <textarea
                  rows={6}
                  className="p-2 pt-4 rounded w-full h-10 lg:h-14 text-sm md:text-[1rem] border-2 border-[#E94C60]"
                  placeholder="Write something..."
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
            </div>
            <div className="text-center">
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg mb-4">
                  Carenest will get in touch with you shortly.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
                  Something went wrong. Please try again.
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white m-auto text-lg font-semibold lg:font-medium rounded-lg px-6 py-2 lg:px-10 bg-[#9AB898] mx-auto lg:mx-4 mt-0 lg:mt-8 border-2 h-12 lg:h-14"
              >
                {isSubmitting ? 'Submitted' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="contact relative hidden md:block w-[70%] h-full pt-10 lg:pr-0 pl-0 lg:pl-40 bg-no-repeat">
        <Image
          loading="lazy"
          className="w-[80%] h-[50%]"
          width={100}
          height={200}
          src="/images/image 13.svg"
          alt=""
        />
      </div>
    </section>
  );
}
