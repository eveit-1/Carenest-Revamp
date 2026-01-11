'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';


import { Modal } from '@/components/ui/Modal';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  if (items.length === 0) {
    return (
      <div className="py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty.</p>
          <Link href="/product">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.phone) {
      alert('Please fill all user details.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, cartItems: items, total }),
      });
      if (res.ok) {
        setOrderSuccess(true);
        clearCart();
        setCheckoutOpen(false);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || 'Order failed. Please try again.');
      }
    } catch (err) {
      alert('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ...existing code...
  // Recommended products (demo: show featuredProduct)
  const recommendedProducts = [
    {
      id: '1',
      name: 'CareNest Multivitamin Gummies',
      price: 999,
      image: '/images/products/carenest.webp',
      slug: 'careNest-multivitamin',
    },

  ];

  return (
    <div className="py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-md"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  sizes="96px"
                />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100 rounded"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded"
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
                <p className="font-bold w-24 text-right">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Products Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4 text-primary-green">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
                <Image src={product.image} alt={product.name} width={120} height={120} className="rounded-lg mb-2" />
                <h3 className="font-bold text-center mb-1">{product.name}</h3>
                <p className="text-[#E94C60] font-semibold mb-2">₹{product.price}</p>
                <Link href={`/products/${product.slug}`} className="w-full">
                  <Button className="w-full bg-primary-green text-white">View Product</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-primary-red">{formatPrice(total)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/product" className="flex-1">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/checkout" className="flex-1">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
            <Button variant="secondary" onClick={clearCart} className="flex-1">
              Clear Cart
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
