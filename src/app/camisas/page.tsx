"use client"

import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import NotFound from "../not-found";
import Products from "../../ui/components/Products";
import Link from "next/link";
import Pagination from '@/src/ui/components/Pagination';
import { FaArrowLeft } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const itemsPerPage = 12;

  const currentPageFromUrl = Number(searchParams?.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl); 

  const { isPending, data, error } = useQuery({
    queryKey: ['Products'],
    queryFn: () => fetch(`/api/products/get-products`).then((res) => res.json()),
  });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.length > 0 ? products.slice(indexOfFirstItem, indexOfLastItem) : '';

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <div>Error fetching product data.</div>;
  if (!data || data.length === 0) return <NotFound />;

  return (
    <div className="mt-[100px] w-full">
      <Link href={'/'} className="flex items-center gap-[10px] ml-1/10">
        <FaArrowLeft />
        <h1 className="text-2xl">Voltar</h1>
      </Link>
      <h1 className="text-black w-full text-center text-2xl font-bold">O hype está com você</h1>
      <Pagination
            totalProducts={products.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
        />
      <Products pagination={true} products={currentProducts} />
      <Pagination
        totalProducts={products.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}