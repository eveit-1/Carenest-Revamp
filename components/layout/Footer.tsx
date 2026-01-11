import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/logo.png"
              alt="CareNest Logo"
              width={160}
              height={80}
              className="mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              CareNest is a digital multispecialty OPD providing carefully reviewed
              healthcare products and expert advice. We believe telehealth can transform
              healthy living and improve everyday lifestyles.
            </p>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase mb-4">
              Overview
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Health</li>
              <li>
                <Link
                  href="/appointment"
                  className="text-gray-400 hover:text-white transition"
                >
                  Make a Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/#services' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Terms & Conditions', href: '/terms&conditions' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Return Policy', href: '/returnpolicy' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase mb-4">
              Connect
            </h3>

            <div className="flex items-center gap-4 mb-4">
              {[
                {
                  href: 'https://www.facebook.com/profile.php?id=100085891995908',
                  icon: '/images/facebook-app-symbol.png',
                  label: 'Facebook',
                },
                {
                  href: 'https://www.instagram.com/carenest.in/',
                  icon: '/images/instagram (1).png',
                  label: 'Instagram',
                },
                {
                  href: 'https://www.linkedin.com/company/carenest-india/',
                  icon: '/images/linkedin.png',
                  label: 'LinkedIn',
                },
                {
                  href: 'https://www.youtube.com/channel/UCi6zEGrVo1GLbb2cSygglOA',
                  icon: '/images/youtube.png',
                  label: 'YouTube',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={18}
                    height={18}
                  />
                </a>
              ))}
            </div>

            <a
              href="mailto:contact@carenest.in"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              contact@carenest.in
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} CareNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
