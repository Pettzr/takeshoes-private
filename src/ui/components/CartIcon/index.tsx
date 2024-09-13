'use client'

import { RiShoppingCartLine } from 'react-icons/ri';
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
        if(!data?.length){
          setProducts(0)
        } else {
            setProducts(data.length)
        }
      }, [data]);

    if (isPending) return null;
    if (error) return null;
    if (!data) return null;

    console.log(products)

    return(
        <Link href={'/carrinho'}>
            <RiShoppingCartLine className='fixed left-0 z-50' size={40} color='black'/>
            <div className='fixed left-8 top-36 bg-red-700 w-6 h-6 rounded-full 
            items-center flex justify-center text-white text-md p-3 z-50'>
                {products}
            </div>
        </Link>
    )
}