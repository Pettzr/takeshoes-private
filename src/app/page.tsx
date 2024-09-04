"use client"
import React from 'react';
import MarketingCarousel from '../ui/client/marketing-carousel';
import Link from 'next/link';
import News from '../ui/client/news';

export default function Page() {

  return (  
      <div className="flex flex-col  w-full">
          <h1 className="text-center text-black text-2xl font-bold mt-[50px]">Olá, seja bem-vindo a nossa loja!</h1>
          <MarketingCarousel />
          <News />
          <Link href={'/explorar'} className='p-4 bg-black rounded-lg w-[300px] text-white text-center self-center my-[160px]'>
            <button>Explorar</button>
          </Link>
      </div>
  );
}