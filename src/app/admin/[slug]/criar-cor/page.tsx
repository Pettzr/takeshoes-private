"use client"
import ProductForm from "@/src/ui/admin/ProductForm";
import { useParams } from 'next/navigation';
import { useProduct } from '@/src/context/ProductContext';
import { useEffect } from 'react';
import AddColor from "@/src/ui/admin/ColorMenu";
import {  useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";

export default function CreateColorPage() {
  const { slug } = useParams() as { slug: string };
  const { product, fetchProductBySlug } = useProduct();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug);
    }
  }, [slug, fetchProductBySlug]);

  const handleColorSubmit = async (colorData: any) => {
    try {
      const response = await fetch(`/api/products/variants/${slug}/create-variant`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colorData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Produto criado com sucesso:', data);
        toast.success('Produto criado com sucesso');
        queryClient.invalidateQueries({queryKey: ['productBySlug', slug]})
      } else {
        console.error('Erro ao criar o produto:', await response.text());
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  if(!product) return <div>Loading...</div>

  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center">
        <AddColor variant={product.variant} slug={slug} />
        <ProductForm onSubmit={handleColorSubmit} showProductName={false} />
      </div>
    </div>
  );
}
