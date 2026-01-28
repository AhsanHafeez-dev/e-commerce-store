import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    category: {
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <Link href={`/products/${product.id}`}>
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">Category: {product.category.name}</p>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
}