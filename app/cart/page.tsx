'use client';

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="mb-4">Your cart is empty.</p>
          <Link href="/products" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cart.map((item) => (
              <div key={item.productId} className="flex items-center border rounded-lg shadow-md p-4">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-md mr-4"
                  />
                )}
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t pt-4 flex justify-end items-center">
            <h2 className="text-2xl font-bold mr-4">Total: ${getTotalPrice().toFixed(2)}</h2>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
