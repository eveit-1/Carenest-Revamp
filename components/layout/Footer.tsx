import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="CareNest Logo"
              width={150}
              height={75}
              className="mb-4 h-auto"
            />
            <p className="text-gray-400 leading-relaxed">
              CareNest is a digital multispecialty OPD that provides you with products
              that have been carefully reviewed for your optimal healthcare. We believe
              that telehealth and advice can change your outlook on living healthily and
              your way of life!
            </p>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-lg font-bold mb-4">Overview</h3>
            <p className="text-gray-400 mb-2">Health</p>
            <Link
              href="/appointment"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Make a Schedule
            </Link>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-bold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms&conditions"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policies
                </Link>
              </li>
              <li>
                <Link
                  href="/returnpolicy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Social Media</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.facebook.com/profile.php?id=100085891995908"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Image
                  src="/images/facebook-app-symbol.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://www.instagram.com/carenest.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Image
                  src="/images/instagram (1).png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/carenest-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Image
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCi6zEGrVo1GLbb2cSygglOA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <Image
                  src="/images/youtube.png"
                  alt="YouTube"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
            </div>
            <a
              href="mailto:contact@carenest.in"
              className="text-gray-400 hover:text-white transition-colors"
            >
              contact@carenest.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
