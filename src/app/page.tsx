"use client"
import React, { useEffect, useState } from 'react';
import MarketingCarousel from '../ui/client/marketing-carousel';
import Link from 'next/link';
import News from '../ui/client/news';
import SearchBar from '../ui/components/SearchBar';
import Products from '../ui/components/Products';
import { ExplorarSkeleton } from '../ui/components/Skeletons';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const [ products, setProducts ] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { isPending, error, data } = useQuery({
      queryKey: ['products'],
      queryFn: () =>
          fetch('/api/products/get-products').then((res) =>
              res.json(),
      ),
  })
  
  useEffect(() => {
      if(data) {
          if(Array.isArray(data)) {
          setProducts(data)
          }
      }
  }, [data])
 
  
  if (isPending) return <ExplorarSkeleton/>;    
  if (error) return 'An error has ocurred' + error.message;

  console.log(data.variant)

  const handleSearch = (results: any[]) => {
      setProducts(results)
      setCurrentPage(1);
      console.log(results)
  };

  const handlePageChange = (page: number) => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);


  return (  
      <div className="flex flex-col w-full mb-[100px]">
          <h1 className="text-center text-black text-2xl font-bold mt-[50px]">Olá, seja bem-vindo a nossa loja!</h1>
          <MarketingCarousel />
          <News />
          <Link href={'/explorar'} className='p-4 bg-black rounded-lg w-[300px] text-white text-center self-center mt-[160px]'>
            <button>Explorar</button>
          </Link>
          <div className="flex flex-col w-full min-h-screen">
            <SearchBar onSearch={handleSearch} />
            <Products products={currentProducts} onPageChange={handlePageChange} totalProducts={products.length} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
        </div>
      </div>
  );
}