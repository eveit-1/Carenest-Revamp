"use client";

import React, { useState } from "react";
import { indianStates } from "@/lib/indianStates";
import { loadRazorpayScript } from "@/lib/razorpay";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", zip: "" });
  const [fetchingCity, setFetchingCity] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (paymentMethod === "razorpay") {
      // Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Failed to load Razorpay. Try again.");
        setLoading(false);
        return;
      }
      // Create order on backend (simulate for now)
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, address, cartItems: items, total, paymentMethod }),
      });
      const data = await res.json();
      if (!res.ok || !data) {
        alert("Order failed. Please try again.");
        setLoading(false);
        return;
      }
      // Razorpay options
      const options = {
        key: "rzp_test_YourKeyHere", // Replace with your Razorpay key
        amount: total * 100,
        currency: "INR",
        name: "Carenest Store",
        description: "Order Payment",
        image: "/images/logo.png",
        order_id: data.razorpayOrderId, // If you generate order_id from backend
        handler: function (response: any) {
          setOrderSuccess(true);
          clearCart();
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: { color: "#F9495C" },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
      return;
    }
    // Cash on Delivery
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, address, cartItems: items, total, paymentMethod }),
      });
      if (res.ok) {
        setOrderSuccess(true);
        clearCart();
      } else {
        alert("Order failed. Please try again.");
      }
    } catch {
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Coupon logic (simple demo)
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toLowerCase() === "care10") {
      setDiscount(Math.floor(total * 0.1));
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-green/10 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 border border-primary-green">
        <div className="flex items-center gap-3 mb-8">
          <img src="/images/logo.png" alt="Carenest" className="w-12 h-12 rounded-full border" />
          <h2 className="text-3xl font-extrabold text-primary-green tracking-tight">Checkout</h2>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${step === 1 ? 'bg-primary-green text-white' : 'bg-gray-200 text-gray-600'}`}>1. Info</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${step === 2 ? 'bg-primary-green text-white' : 'bg-gray-200 text-gray-600'}`}>2. Address</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${step === 3 ? 'bg-primary-green text-white' : 'bg-gray-200 text-gray-600'}`}>3. Payment</span>
          </div>
          <span className="text-sm text-gray-500">{items.length} item(s)</span>
        </div>
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-5">
            <h3 className="font-semibold text-lg mb-2 text-primary-green">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-green" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} required />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input type="email" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-green" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-green" value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} required />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button type="submit" className="flex-1 bg-primary-green text-white">Next</Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-5">
            <h3 className="font-semibold text-lg mb-2 text-primary-green">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Address Line 1</label>
                <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-green" value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} required />
              </div>
              <div>
                <label className="block mb-1 font-medium">Address Line 2</label>
                <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-green" value={address.line2} onChange={e => setAddress({ ...address, line2: e.target.value })} />
              </div>
              <div>
                <label className="block mb-1 font-medium">City</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-green"
                  value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })}
                  required
                  disabled={fetchingCity}
                />
                {fetchingCity && <span className="text-xs text-gray-500">Fetching city...</span>}
              </div>
              <div>
                <label className="block mb-1 font-medium">State</label>
                <select
                  className="w-full border rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-green text-sm h-10"
                  value={address.state}
                  onChange={e => setAddress({ ...address, state: e.target.value })}
                  required
                  style={{ maxHeight: '40px', minHeight: '40px' }}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">ZIP Code</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-green"
                  value={address.zip}
                  onChange={async e => {
                    const zip = e.target.value;
                    setAddress({ ...address, zip });
                    if (zip.length === 6) {
                      setFetchingCity(true);
                      try {
                        const res = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
                        const data = await res.json();
                        if (data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
                          setAddress(addr => ({ ...addr, city: data[0].PostOffice[0].District }));
                        }
                      } catch {}
                      setFetchingCity(false);
                    }
                  }}
                  required
                  maxLength={6}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button type="button" className="flex-1 bg-gray-200 text-primary-green" onClick={handleBack}>Back</Button>
              <Button type="submit" className="flex-1 bg-primary-green text-white">Next</Button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleOrder} className="space-y-5">
            <h3 className="font-semibold text-lg mb-2 text-primary-green">Payment Method</h3>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Select Payment</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")}/>
                  <span className="font-medium">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" value="razorpay" checked={paymentMethod === "razorpay"} onChange={() => setPaymentMethod("razorpay")}/>
                  <span className="font-medium">Razorpay</span>
                </label>
              </div>
            </div>
            {/* Coupon Section - Improved Style */}
            <div className="mb-4">
              <form onSubmit={handleApplyCoupon} className="flex gap-2 items-center justify-center bg-gradient-to-r from-primary-green/10 to-primary-green/30 rounded-xl p-4 shadow">
                <input
                  type="text"
                  className="border-2 border-primary-green rounded-lg px-4 py-2 w-48 text-lg focus:ring-2 focus:ring-primary-green"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  disabled={couponApplied}
                  autoComplete="off"
                />
                <Button type="submit" className="bg-primary-green text-white font-bold px-6 py-2 rounded-lg shadow" disabled={couponApplied}>Apply</Button>
              </form>
              <div className="flex justify-center mt-2">
                {couponApplied && <span className="text-green-600 text-base font-semibold bg-green-50 px-3 py-1 rounded">Coupon applied! -₹{discount}</span>}
                {couponError && <span className="text-red-600 text-base font-semibold bg-red-50 px-3 py-1 rounded">{couponError}</span>}
              </div>
            </div>
            <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-primary-green">
              <h4 className="font-bold mb-2 text-primary-green">Order Summary</h4>
              <ul className="mb-2 divide-y">
                {items.map(item => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span>{item.name} <span className="text-xs text-gray-500">x {item.quantity}</span></span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Subtotal:</span>
                <span className="text-primary-red">₹{total}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Discount:</span>
                  <span className="text-green-600">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span className="text-primary-red">₹{total - discount}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button type="button" className="flex-1 bg-gray-200 text-primary-green" onClick={handleBack}>Back</Button>
              <Button type="submit" className="flex-1 bg-primary-green text-white" disabled={loading || !paymentMethod}>
                {loading ? "Placing Order..." : paymentMethod === "razorpay" ? "Pay with Razorpay" : "Place Order"}
              </Button>
            </div>
          </form>
        )}
        {orderSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-10 text-center max-w-md mx-auto shadow-2xl border-2 border-primary-green">
              <img src="/images/logo.png" alt="Carenest" className="w-16 h-16 mx-auto mb-4 rounded-full border" />
              <h3 className="text-3xl font-extrabold mb-2 text-primary-green">Order Placed!</h3>
              <p className="text-lg text-gray-700 mb-4">Thank you for your purchase.<br />Your order has been placed successfully.</p>
              <div className="mb-4">
                <span className="block text-primary-green font-bold">Estimated Delivery: 3-5 days</span>
                <span className="block text-gray-500 text-sm mt-1">You will receive a confirmation email soon.</span>
              </div>
              <Button onClick={() => router.push("/")} className="bg-primary-green text-white px-8 py-2 rounded-lg font-bold">Go Home</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
