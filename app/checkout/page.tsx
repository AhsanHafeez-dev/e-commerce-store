'use client';

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    if (!session?.user?.id) {
      router.push("/auth/signin");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cart }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      clearCart();
      router.push("/order-confirmation"); // Redirect to an order confirmation page
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="mb-4">Your cart is empty. Add items to proceed to checkout.</p>
          <button onClick={() => router.push("/products")} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="grid grid-cols-1 gap-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center border rounded-lg p-4">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="object-cover rounded-md mr-4"
                    />
                  )}
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 flex justify-end items-center">
            <h2 className="text-2xl font-bold mr-4">Total: ${getTotalPrice().toFixed(2)}</h2>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}