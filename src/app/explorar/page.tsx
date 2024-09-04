"use client"

import { useEffect, useState } from 'react';
import Products from '@/src/ui/components/Products';
import SearchBar from '@/src/ui/components/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { ExplorarSkeleton } from '@/src/ui/components/Skeletons';

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
        <div className="flex flex-col w-full min-h-screen">
            <SearchBar onSearch={handleSearch} />
            <Products products={currentProducts} onPageChange={handlePageChange} totalProducts={products.length} itemsPerPage={itemsPerPage} currentPage={currentPage}/>
        </div>
    );
};