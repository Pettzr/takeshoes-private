'use client';

import { useEffect } from 'react';
import { useProduct } from '@/src/context/ProductContext';
import AddColor from '@/src/ui/admin/ColorMenu';
import { useParams } from 'next/navigation';
import EditVariant from '@/src/ui/admin/EditVariant';

export default function ProductColorPage() {
  const { slug, color } = useParams() as { slug: string, color: string };
  const { product, isLoading, error, fetchProductBySlug } = useProduct();
  
  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug);
    }
  }, [slug, fetchProductBySlug]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product data</div>;
  if (!product) return <div>No product data found</div>;
  
  return (
    <div className='w-full'>
      <div className='flex flex-col w-full items-center'>
        <AddColor variant={product.variant} slug={slug} />
        <EditVariant slug={slug} color={color} variant={product.variant} />
      </div>
    </div>
  );
}
