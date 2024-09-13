"use client";

import React, { createContext, useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface ProductContextType {
  product: Product | null | undefined;
  isLoading: boolean;
  error: any;
  fetchProductBySlug: (slug: string) => void;
  invalidateProductQueries: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode } ) {
  const [slug, setSlug] = useState<string | null>(null);
  const queryClient = useQueryClient()

  const { data: product, error, isLoading } = useQuery<Product>({
    queryKey: ['productBySlug', slug],
    queryFn: () => {
      if (!slug) return Promise.reject("Slug is required");
      return fetch(`/api/products/${slug}`).then(res => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      });
    },
    enabled: !!slug, 
  });

  const invalidateProductQueries = () => {
    if (slug) {
      queryClient.invalidateQueries({queryKey: ['productBySlug', slug]});
    }
  };

  const fetchProductBySlug = (newSlug: string) => {
    setSlug(newSlug);
  };

  return (
    <ProductContext.Provider value={{ product, isLoading, error, fetchProductBySlug, invalidateProductQueries }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
