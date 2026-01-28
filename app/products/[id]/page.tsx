'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
  category: {
    name: string;
  };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading product...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-4 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {product.imageUrl && (
          <div className="md:w-1/2">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="rounded-lg shadow-md w-full"
            />
          </div>
        )}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">Category: {product.category.name}</p>
          <button
            onClick={() => product && addToCart(product, 1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}