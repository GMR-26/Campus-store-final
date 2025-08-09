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

// This is the component for a single product card
function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock_quantity === 0;
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image_url || 'https://via.placeholder.com/300'}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-lg mt-2 mb-4">₹{product.price}</p>
      <div className="mt-auto">
        {isOutOfStock ? (
          <p className="text-red-500 font-semibold">Out of Stock</p>
        ) : (
          <p className="text-green-600 font-semibold">In Stock: {product.stock_quantity}</p>
        )}
      </div>
    </div>
  );
}

// This tells Next.js to always fetch fresh data for this page
export const dynamic = 'force-dynamic';

// The main homepage component
export default async function HomePage() {
  // Fetch products directly from Supabase
  const { data: products } = await supabase.from('products').select('*');

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Campus Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}