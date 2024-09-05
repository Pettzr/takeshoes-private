"use client";

import Products from "@/src/ui/components/Products";
import { CartSkeletonLogout, ExplorarSkeleton } from "@/src/ui/components/Skeletons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";

export default function Page() {
  const [ products, setProducts ] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const session = useSession();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
      queryKey: ['cart-products'],
      queryFn: () =>
          fetch('/api/user/get-cart')
            .then((res) => res.json())
            .then((data) => data),
  })

  useEffect(() => {
    if(data) {
        if(Array.isArray(data)) {
          console.log(data)
        setProducts(data)
        }
    }
}, [data])
  
  if( session.status === 'authenticated'){
    if (isPending) return <ExplorarSkeleton/>;    
    if (error) return 'An error has ocurred' + error.message;
    if (!data) return <ExplorarSkeleton/>;
  } else {
    if (isPending) return <CartSkeletonLogout/>; 
  }

  const handleDelete = async (itemId: any) => {
    const confirmDelete = window.confirm('Tem certeza que deseja retirar este item do carrinho?')
      if(!confirmDelete) {
        return null
      }

    const previousProducts = [...products];
    const updatedProducts = products.filter(product => product.id !== itemId);

    setProducts(updatedProducts)

    try {
        await fetch('/api/user/remove-item-cart', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({itemId: itemId}),
      });
      
      queryClient.invalidateQueries({queryKey: ["cart-products"]});
      } catch (error) {
          console.error('Erro inespereado', error);
          setProducts(previousProducts);
      }
    }


    const handleChangeQuantity = async (productId: any, sizeId: any, variantColor: any, event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = parseInt(event.target.value, 10);
      const previousProducts = [...products];
      const updatedProducts = products.map(product =>
        product.product.id === productId && product.sizeId === sizeId && product.variant.color === variantColor ?
        {...product, quantity: quantity} : product
      );
  
      setProducts(updatedProducts)

      if(quantity) {
          try {
            await fetch('/api/user/add-to-cart',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body : JSON.stringify({user: session.data?.user.email, data: productId, size: sizeId, variant: variantColor, quantity: quantity })
            })

            queryClient.invalidateQueries({queryKey: ["cart-products"]});
        } catch (error) {
            console.error('Erro inesperado', error);
            setProducts(previousProducts);
        }
      }
    }

    const handlePageChange = (page: number) => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
    }

    const handleBuy = () => {
      console.log(`Compra dos produtos ${products.map(product => product.id)} efetuada!`)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);


    return (
      <div className="flex flex-col min-h-screen w-full">
            {session.status !== 'authenticated' ? (
              <div className="w-full h-full flex justify-center items-center">
                <TiShoppingCart className="text-[200px]" />
                <div className="flex flex-col gap-[20px]">
                  <h1 className="text-center text-lg">Seu carrinho está vazio.</h1>
                  <Link className="flex items-center justify-center bg-black rounded p-2 text-white h-[30px] w-[200px] " href={'/login'}>Faça Login</Link>
                  <Link className="flex items-center justify-center bg-black rounded p-2 text-white h-[30px] w-[200px] " href={'/register-user'}>Registrar-se</Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col mt-[100px] border border-black mx-[30px] p-12">
                  <Products products={currentProducts} changeQuantity={handleChangeQuantity} deleteItem={handleDelete} onPageChange={handlePageChange} totalProducts={products.length} itemsPerPage={itemsPerPage} currentPage={currentPage} />
                  <hr className="w-full mt-[30px] border-black" />
                <div className="w-full flex justify-center mt-[100px]">
                  <button className="w-[300px] h-[50px] rounded bg-black text-white" onClick={handleBuy}>Realizar Compra</button>
                </div>
              </div>
            )}
      </div>
    );
}