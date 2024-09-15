'use client';

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation"
import NotFound from "../not-found";
import Products from "../../ui/components/Products";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";


export default function Page () {
    const params = useSearchParams()
    const [products, setProducts] = useState([])
    const q = params?.get('q')

    const {isPending, data, error} = useQuery({
        queryKey: ['search', q],
        queryFn: () => fetch(`/api/products/search?q=${q}`).then((res) => res.json()),
        enabled: !!q
    })
    
    useEffect(() => {
        if(data){
            setProducts(data)
            console.log(data)
        }
    }, [data]) 

    if (isPending) return <h1>Loading...</h1>;
    if (error) return <div>Error fetching product data.</div>;
    if (!data || data.length === 0) return <NotFound/>;

    return(
        <div className="w-full mt-[100px]">
            <Link href={'/'} className="flex items-center gap-[10px] ml-1/10">
                <FaArrowLeft />
                <h1 className="text-2xl">Voltar</h1>
            </Link>
            <h1 className="text-black w-full text-center text-2xl font-bold my-[40px]">O estilo que você procura!</h1>
            <Products pagination={true} products={products}/>
        </div>
    )
}