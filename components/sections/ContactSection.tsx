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
  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'success' | 'error'>('idle');

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT – FORM */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold">
            Contact <span className="text-[#9AB898]">Us</span>
          </h2>

          <p className="mt-4 text-gray-600 text-sm md:text-lg">
            Helping you is our topmost priority. We usually respond within 48 hours.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register('name')}
                  className="w-full h-12 px-4 rounded-lg border border-[#E94C60] focus:outline-none focus:ring-2 focus:ring-[#E94C60]/40"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register('email')}
                  className="w-full h-12 px-4 rounded-lg border border-[#E94C60] focus:outline-none focus:ring-2 focus:ring-[#E94C60]/40"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register('phone')}
                  className="w-full h-12 px-4 rounded-lg border border-[#E94C60] focus:outline-none focus:ring-2 focus:ring-[#E94C60]/40"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Write your message..."
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-lg border border-[#E94C60] focus:outline-none focus:ring-2 focus:ring-[#E94C60]/40 resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                CareNest will get in touch with you shortly.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                Something went wrong. Please try again.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 inline-flex items-center justify-center px-10 h-12 rounded-lg bg-[#9AB898] text-white font-semibold hover:opacity-90 transition disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </button>
          </form>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden lg:flex justify-center">
          <Image
            src="/images/image 13.svg"
            alt="Contact illustration"
            width={420}
            height={420}
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
