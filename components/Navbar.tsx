'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          E-commerce Store
        </Link>
        <div className="flex space-x-4">
          <Link href="/products" className="text-gray-300 hover:text-white">
            Products
          </Link>
          <Link href="/cart" className="text-gray-300 hover:text-white">
            Cart
          </Link>
          <Link href="/checkout" className="text-gray-300 hover:text-white">
            Checkout
          </Link>
          {session ? (
            <>
              <span className="text-gray-300">Welcome, {session.user?.name || session.user?.email}</span>
              <button onClick={() => signOut()} className="text-gray-300 hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link href="/auth/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}