'use client';

import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-green-600">Order Placed Successfully!</h3>
        <p className="text-center mt-4 text-gray-700">
          Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <Link href="/products" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
            Continue Shopping
          </Link>
          <Link href="/" className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}