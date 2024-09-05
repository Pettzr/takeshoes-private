"use client"

import Product from "@/src/ui/client/product";
import { useQuery } from "@tanstack/react-query";


export default function Page({ params }: { params: { slug: string} }) {
    const { slug } = params;
    const { isPending, data, error } = useQuery<Product>({
        queryKey: ['products'],
        queryFn: () => fetch(`/api/products/${slug}`).then((res) => res.json()),
        enabled: !!slug,
    });
    console.log(data)
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error fetching product data.</div>;
    if (!data) return <div>No product found for slug {slug}</div>;

    return(
        <div className="flex w-full flex-col items-center min-h-screen mb-[300px]">
                <h1 className="text-center text-white text-2xl font-bold">Olá, seja bem-vindo!</h1>
                <div className="flex w-full justify-center">
                    <Product data={data} />
                </div>
        </div>
    )
}