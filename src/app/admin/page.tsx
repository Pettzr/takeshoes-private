"use client"

import React, { useEffect, useState } from 'react';
import NavAdmin from "@/src/ui/admin/NavAdmin";
import TableAdmin from "@/src/ui/admin/TableProduct";
import SearchBar from "@/src/ui/components/SearchBar";
import { AdminSkeleton } from "@/src/ui/components/Skeletons";
import { useQuery } from "@tanstack/react-query";
import Pagination from '@/src/ui/components/Pagination';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const currentPageFromUrl = Number(searchParams?.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl); 
  const itemsPerPage = 12;

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch(`/api/products/get-products`).then((res) => res.json()),
  });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleSearch = (results: any[]) => {
    setProducts(results);
  };

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.length > 0 ? products.slice(indexOfFirstItem, indexOfLastItem) : '';

  return (
    <div className="flex flex-col w-full min-h-screen">
      <NavAdmin />
      <SearchBar onSearch={handleSearch} />
      <Pagination
        totalProducts={products.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {isLoading ? <AdminSkeleton /> : <TableAdmin data={currentProducts} />}
      <Pagination
        totalProducts={products.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}