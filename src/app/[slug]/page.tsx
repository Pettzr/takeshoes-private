"use client"

import Product from "@/src/ui/client/Product";
import { ProductSkeleton } from "@/src/ui/components/Skeletons";
import { useQuery } from "@tanstack/react-query";


export default function Page({ params }: { params: { slug: string} }) {
    const { slug } = params;
    const { isPending, data, error } = useQuery<Product>({
        queryKey: ['products'],
        queryFn: () => fetch(`/api/products/${slug}`).then((res) => res.json()),
        enabled: !!slug,
    });
    console.log(data)
    if (isPending) return <ProductSkeleton/>;
    if (error) return <div>Error fetching product data.</div>;
    if (!data) return <div>No product found for slug {slug}</div>;

    return(
        <div className="flex w-full flex-col items-center min-h-screen mb-[50px]">
                <div className="flex w-full justify-center">
                    <Product data={data} />
                </div>
        </div>
    )
}