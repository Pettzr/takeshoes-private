"use client"
import React from 'react';
import MarketingCarousel from '@/src/ui/client/MarketingCarousel';
import News from '@/src/ui/client/News';
import Products from '../ui/components/Products';
import { HomeSkeleton } from '../ui/components/Skeletons';
import { useQuery } from '@tanstack/react-query';
import tenis from '../../public/images/tenis.jpg'
import Image from 'next/image';

export default function Page() {
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
          <h1 className="text-center text-black text-5xl font-bold my-[100px]">O hype está com você!</h1>
          <MarketingCarousel />
          <News />
          <div className='w-full flex justify-center my-[100px]'>
            <Image src={tenis} width={2000} height={200} alt={'Tênis'} className='w-3/4 h-[800px]' />
          </div>
          <Products pagination={true} products={maxData}/>
      </div>
  );
}