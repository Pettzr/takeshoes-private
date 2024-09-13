'use client';

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation"
import NotFound from "../not-found";
import Products from "../../ui/components/Products";
import { useEffect, useState } from "react";


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
        <Products pagination={true} products={products}/>
    )
}