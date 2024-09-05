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
  const options = ["created_at_desc", "price_asc", "price_desc", ]
  const textOptions = ['Mais Recentes', 'Menor preço', 'Maior preço',]
  const [sortOrder, setSortOrder] = useState(''); 
  const [sortedProducts, setSortedProducts] = useState<any[]>([]);
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
          setSortedProducts(data)
          }
      }
  }, [data])

  useEffect(() => {
    let sorted = [...products]; 

    if (sortOrder === 'price_asc') {
      sorted.sort((a, b) => {
        const priceA = a.variant?.[0]?.price || 0; // Pega o preço da primeira variante
        const priceB = b.variant?.[0]?.price || 0;
        return priceA - priceB;
      });
    } else if (sortOrder === 'price_desc') {
      sorted.sort((a, b) => {
        const priceA = a.variant?.[0]?.price || 0;
        const priceB = b.variant?.[0]?.price || 0;
        return priceB - priceA;
      });
    } else if (sortOrder === 'created_at_desc') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setSortedProducts(sorted);
  }, [sortOrder, products]);
 
  
  if (isPending) return <HomeSkeleton/>;    
  if (error) return 'An error has ocurred' + error.message;


  const handleSearch = (results: any[]) => {
    setSortedProducts(results);
    setCurrentPage(1);
  };


const handlePageChange = (page: number) => {
  setCurrentPage(page);
  productRef.current?.scrollIntoView();
};

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };


  return (  
      <div className="flex flex-col w-full mb-[100px]" >
          <h1 className="text-center text-black text-6xl font-bold mt-[150px]">Olá, seja bem-vindo a nossa loja!</h1>
          <MarketingCarousel />
          <News />
          <div className="flex flex-col w-full min-h-screen" ref={productRef}>
            <SearchBar onSearch={handleSearch} />
            <div className="flex flex-col justify-start ml-12/100">
              <label htmlFor="sortOrder" className="mr-2">Ordenar por:</label>
              <select id="sortOrder" value={sortOrder} onChange={handleSortChange} className=" w-1/5 border-2 border-black/80 p-2 rounded">
                {options.map((option, index) => (
                  <option value={option} key={index}>{textOptions[index]}</option>
                  ))}
              </select>
          </div>
            <Products pagination={true} products={currentProducts} onPageChange={handlePageChange} totalProducts={products.length} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
        </div>
      </div>
  );
}