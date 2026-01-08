import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CareNest - Get vitamins in tasty gummies | Online Doctor Consultation',
  description:
    'Our health gummies are packed with vitamins and minerals to support your immune system and overall wellness. Get a free online doctor consultation with your order!',
  keywords: 'online medical consultation, health gummies, vitamins, telehealth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="App overflow-x-hidden">
            <Header />
            <main>{children}</main>
            <Footer />
            {/* WhatsApp Floating Button */}
            <Link
              href="https://api.whatsapp.com/send?phone=9136427933&text=Hello%20."
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp size={32} className="text-white" />
            </Link>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
