// src/app/admin/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

async function addProduct(formData: FormData) {
  'use server'; // This function runs on the server
  
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const imageUrl = formData.get('imageUrl') as string;

  // Insert the new product into the database
  await supabase.from('products').insert([
    { name, price, stock_quantity: stock, image_url: imageUrl },
  ]);

  // Refresh the homepage to show the new product
  revalidatePath('/');
}

export default function AdminPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Add New Product</h1>
        <form action={addProduct} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" name="name" id="name" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input type="number" name="price" id="price" required step="0.01" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <input type="number" name="stock" id="stock" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" id="imageUrl" placeholder="https://example.com/image.png" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Add Product
          </button>
        </form>
      </div>
    </main>
  );
}