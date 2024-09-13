"use client"
import React, { useRef } from 'react';
import MarketingCarousel from '@/src/ui/client/MarketingCarousel';
import News from '@/src/ui/client/News';
import Products from '../ui/components/Products';
import { HomeSkeleton } from '../ui/components/Skeletons';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const productRef = useRef<HTMLDivElement>(null)

  const { isPending, error, data } = useQuery({
      queryKey: ['products'],
      queryFn: () =>
          fetch('/api/products/get-products').then((res) =>
              res.json(),
      ),
  })
  
  if (isPending) return <HomeSkeleton/>;    
  if (error) return 'An error has ocurred' + error.message;

  const maxData = data.slice(0, 9)

  return (  
      <div className="flex flex-col w-full mb-[100px] min-h-screen" >
          <h1 className="text-center text-black text-5xl font-bold my-[100px]">Olá, seja bem-vindo a nossa loja!</h1>
          <MarketingCarousel />
          <News />
          <h1 className="text-center text-black text-3xl font-bold my-[100px]">Produtos</h1>
          <Products pagination={true} products={maxData}/>
      </div>
  );
}