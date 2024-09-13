"use client"

import Product from "@/src/ui/client/Product";
import { ProductSkeleton } from "@/src/ui/components/Skeletons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import NotFound from "../../not-found";


export default function Page({ params }: { params: { slug: string} }) {
    const { slug } = params;
    const router = useRouter()
    const { isPending, data, error } = useQuery<Product>({
        queryKey: ['products'],
        queryFn: () => fetch(`/api/products/${slug}`).then((res) => res.json()),
        enabled: !!slug,
    });
    if(data?.error && data!.error === 'Produto não encontrado' ) {
        router.push('/not-found')
    }
    if (isPending) return <ProductSkeleton/>;
    if (error) return <div>Error fetching product data.</div>;
    if (!data || !data.variant) return <NotFound/>;

    return (
            <div className="flex w-full flex-col items-center min-h-screen mb-[50px]">
                    <div className="flex w-full justify-center">
                        <Product data={data} />
                    </div>
            </div>
    )   
}