"use client"
import ProductForm from "@/src/ui/admin/ProductForm";
import { useParams } from 'next/navigation';
import { useProduct } from '@/src/context/ProductContext';
import { useEffect } from 'react';
import AddColor from "@/src/ui/admin/ColorMenu";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreateColorPage() {
  const { slug } = useParams() as { slug: string };
  const { product, isLoading, error, fetchProductBySlug } = useProduct();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug);
    }
  }, [slug]);

  const mutation = useMutation({
    mutationFn: async (colorData: any) => {
      const response = await fetch(`/api/products/variants/${slug}/create-variant`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colorData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    },
    onSuccess: () => {
      alert('Cor adicionada com sucesso');
      // Invalida a query específica usando a chave correta
      queryClient.invalidateQueries({ queryKey: ['productBySlug', slug] });
    },
    onError: (error: any) => {
      console.error('Erro ao adicionar a cor:', error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product data</div>;
  if (!product) return <div>No product data found</div>;

  const handleColorSubmit = (colorData: any) => {
    mutation.mutate(colorData);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center">
        <AddColor variant={product.variant} slug={slug} />
        <ProductForm onSubmit={handleColorSubmit} showProductName={false} />
      </div>
    </div>
  );
}
