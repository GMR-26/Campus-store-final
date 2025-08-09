// src/app/page.tsx
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

// Define the shape of our product data
interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  image_url: string | null;
}

// This is the component for a single product card with updated styling
function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock_quantity === 0;
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col bg-white">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image_url || 'https://via.placeholder.com/300'}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-grow flex flex-col">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-xl font-semibold my-2 text-gray-900">₹{product.price}</p>
        <div className="mt-auto pt-2">
          {isOutOfStock ? (
            <span className="font-semibold text-red-600">Out of Stock</span>
          ) : (
            <span className="font-semibold text-green-700">In Stock: {product.stock_quantity}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// This tells Next.js to always fetch fresh data for this page
export const dynamic = 'force-dynamic';

// The main homepage component
export default async function HomePage() {
  // Fetch products directly from Supabase
  const { data: products } = await supabase.from('products').select('*').order('name');

  return (
    <div className="container mx-auto p-6 sm:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}