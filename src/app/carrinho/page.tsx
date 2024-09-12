"use client";

import CartProducts from "@/src/ui/client/CartProducts";
import { CartSkeletonLogout, HomeProductsSkeleton } from "@/src/ui/components/Skeletons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { toast } from "react-toastify";

export default function Page() {
  const [ products, setProducts ] = useState<any[]>([]);
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
        setProducts(data)
        }
    }
  }, [data])

  

  if (isPending) return <CartSkeletonLogout/>;    
  if (error) return 'An error has ocurred' + error.message;
  if (!data) return <CartSkeletonLogout/>;
  

  const handleDelete = async (itemId: any) => {
    const confirmDelete = window.confirm('Tem certeza que deseja retirar este item do carrinho?')
      if(!confirmDelete) {
        return null
      }

  const previousProducts = [...products];
  const updatedProducts = products.filter(product => product.id !== itemId);

  setProducts(updatedProducts)

    try {
        toast.loading('Processando...')
        const response = await fetch('/api/user/remove-item-cart', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({itemId: itemId}),
      });

      if(response.ok) {
        toast.dismiss()
        toast.success('Item removido do carrinho.')
      }
      
      queryClient.invalidateQueries({queryKey: ["cart-products"]});
      queryClient.invalidateQueries({ queryKey: ['cart-icon'] });
      } catch (error) {
          toast.dismiss()
          toast.error('Erro ao inserir produto no carrinho.')
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


    const handleBuy = async () => {
        try {
          toast.loading('Processando...')
          const response = await fetch('/api/user/add-to-purchase',{
              method: 'POST',
              headers: {
                  'Content-type': 'application/json'
              },
              body : JSON.stringify({user: session.data?.user.email, data:data })
          })
  
          const dataResponse = await response.json()
          
          toast.dismiss()
          if (response.ok) {
              toast.success('Pedido feito com sucesso!');
          } else {
              console.error('Erro ao fazer pedido:', dataResponse);
              toast.error('Erro ao fazer pedido: ' + dataResponse.error);
          }
  
          queryClient.invalidateQueries({ queryKey: ['cart-icon'] });
          queryClient.invalidateQueries({ queryKey: ['cart-products'] });

      } catch (error) {
          console.error('Erro inesperado', error);
          toast.error('Erro ao fazer pedido');
      }
    }

    const totalPrice = products.map((product: any) => {
      return product.variant.price * product.quantity
    }).reduce((acc: any, curr: any) => acc + curr, 0)


    return (
      <div className="flex flex-col min-h-screen w-full">
        <h1 className="text-full text-3xl font-bold text-center mt-[100px]">Carrinho</h1>
            {session.status !== 'authenticated' ? (
              <div className="w-full h-full flex justify-center items-center">
                <TiShoppingCart className="text-[200px]" />
                <div className="flex flex-col gap-[20px]">
                  <h1 className="text-center text-lg">Seu carrinho está vazio.</h1>
                  <Link className="flex items-center justify-center bg-black rounded p-2 text-white h-[30px] w-[200px] " href={'/entrar'}>Faça Login</Link>
                  <Link className="flex items-center justify-center bg-black rounded p-2 text-white h-[30px] w-[200px] " href={'/cadastrar'}>Registrar-se</Link>
                </div>
              </div>
            ) : products.length > 0 ? (
              <div className="flex flex-col p-12">
                  <CartProducts products={products} changeQuantity={handleChangeQuantity} deleteItem={handleDelete} />
                <div className="w-full flex flex-col justify-center items-center mt-[100px]">
                  <hr className="w-screen bg-black h-[2px]" />
                  <h1 className="mt-[40px]">
                    Preço total: {totalPrice.toFixed(2).replace(".", ",")}
                  </h1>
                  <button
                    className="w-[300px] h-[50px] rounded bg-black text-white"
                    onClick={handleBuy}
                  >
                    Realizar Compra
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center flex-col ">
                <div className="flex gap-[20px] items-center">
                  <TiShoppingCart className="text-[200px]" />
                  <h1 className="text-center text-2xl font-bold">Seu carrinho está vazio.</h1>
                </div>
                <hr className="w-1/2 bg-black h-[5px]"/>
            </div>
            )}
          </div>
        );
}