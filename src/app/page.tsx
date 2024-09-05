"use client"
import React, { useEffect, useRef, useState } from 'react';
import MarketingCarousel from '@/src/ui/client/MarketingCarousel';
import News from '@/src/ui/client/News';
import SearchBar from '../ui/components/SearchBar';
import Products from '../ui/components/Products';
import { HomeSkeleton } from '../ui/components/Skeletons';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const [ products, setProducts ] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const productRef = useRef<HTMLDivElement>(null)
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
 
  
  if (isPending) return <HomeSkeleton/>;    
  if (error) return 'An error has ocurred' + error.message;


  const handleSearch = (results: any[]) => {
      setProducts(results)
      setCurrentPage(1);
      console.log(results)
  };


const handlePageChange = (page: number) => {
  setCurrentPage(page);
  productRef.current?.scrollIntoView();

};

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);


  return (  
      <div className="flex flex-col w-full mb-[100px]" >
          <h1 className="text-center text-black text-6xl font-bold mt-[150px]">Olá, seja bem-vindo a nossa loja!</h1>
          <MarketingCarousel />
          <News />
          <div className="flex flex-col w-full min-h-screen" ref={productRef}>
            <SearchBar onSearch={handleSearch} />
            <Products products={currentProducts} onPageChange={handlePageChange} totalProducts={products.length} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
        </div>
      </div>
  );
}