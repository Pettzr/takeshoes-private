"use client"

import NavAdmin from "@/src/ui/admin/NavAdmin";
import TableAdmin from "@/src/ui/admin/TableProduct";
import SearchBar from "@/src/ui/components/SearchBar";
import { AdminSkeleton } from "@/src/ui/components/Skeletons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch(`/api/products/get-products`).then((res) => res.json()),
  })

  useEffect(() => {
    if(data){
      setProducts(data)
    }
  }, [data]);

 
  const handleSearch = (results: any[]) => {
      setProducts(results)
      console.log(results)
  };

  const handlePageChange = (page: number) => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.length > 0 ? products.slice(indexOfFirstItem, indexOfLastItem) : ''
  
    return (
      <div className="flex flex-col w-full min-h-screen">
        <NavAdmin />
        <SearchBar onSearch={handleSearch} title='Produtos Registrados' />
        {isLoading ? <AdminSkeleton/> : <TableAdmin data={currentProducts} onPageChange={handlePageChange} totalProducts={products.length} itemsPerPage={itemsPerPage} currentPage={currentPage} />}
      </div>
    );
  }