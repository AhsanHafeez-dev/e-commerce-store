'use client';

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider><Navbar />
        <CartProvider>{children}</CartProvider></SessionProvider>
      </body>
    </html>
  );
}