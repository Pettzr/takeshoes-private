'use client'

import { TiShoppingCart } from 'react-icons/ti';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function CartIcon () {
    const [products, setProducts] = useState(0)
    const { isPending, data, error } = useQuery<Product[]>({
        queryKey: ['cart-icon'],
        queryFn: () => fetch(`/api/user/cart-icon`).then((res) => res.json()),
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        if(data){
          setProducts(data.length)
        }
      }, [data]);

    if (isPending) return null;
    if (error) return null;
    if (!data) return null;

    console.log(products)

    return(
        <Link href={'/carrinho'}>
            <TiShoppingCart className='fixed left-0' size={60} color='black'/>
            <div className='fixed left-12 top-36 bg-red-700 w-6 h-6 rounded-full 
            items-center flex justify-center text-white text-lg p-4'>
                {products}
            </div>
        </Link>
    )
}