import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type cartProductProps = {
  products?: any,
  deleteItem: any,
  changeQuantity: any,

}

export default function CartProducts({ products, deleteItem, changeQuantity }: cartProductProps) {

  const quantityOptions = (maxQuantity: number) => {
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  };

  return (
    <div className='w-full'>
      {products.length > 0 ? (
        <>
          <div 
            className="flex  w-76/100 mx-12/100 justify-start p-8 flex-wrap "
          >
            {products.map((product: any) => {
              const options = quantityOptions(product.size?.quantity || 0);
              return (
                <div
                  key={product.product ? product.product.name : product.name}
                  className="flex items-center justify-center max-w-1/4 border-black p-4" 
                >
                  <Link href={`/${product.product ? product.product.slug : product.slug}`} className='flex items-center max-h-[300px] min-h-[300px] min-w-[200px] max-w-[200px] '>
                    <h1 className="w-full text-black text-center text-2xl font-bold mb-[20px]">{product.name}</h1>
                    <Image
                      src={
                        Array.isArray(product.variant)
                          ? product.variant[0]?.images[0]
                          : product.variant?.images[0]
                      }
                      alt="Frente Da Camisa"
                      width={500}
                      height={0}
                      className="w-full border-2 border p-4 h-[200px]"
                    />
                    {!changeQuantity ? <h1 className="w-full text-black text-2xl font-bold mt-[20px]">R${product.variant[0].price.toFixed(2).replace('.', ',')}</h1>
                    : null}
                  </Link>
                  {changeQuantity ? (
                    <div className="w-[400px] flex flex-col items-center bg-gray-300 h-[200px] p-4 gap-4">
                      <label className='flex gap-4'>
                        Tamanho:
                      <h4 className="text-black">{product.size?.size}</h4>
                      </label>
                      <div className="flex w-full justify-center items-center text-black border-black p-1">
                        <h4 className='mr-[15px]'>Quantidade:</h4>
                        <select
                          onChange={(e) => changeQuantity(product.productId, product.sizeId, product.variant.color, e)}
                          className='text-black bg-white rounded text-sm p-2 w-[50px] text-center'
                          value={product.quantity}
                        >
                          {options.map((quantity: any) => (
                            <option className='flex text-sm ' key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label className='flex'>
                        Preço: 
                        <h1 className='text-black ml-[15px]'>R${(product.variant.price * product.quantity).toFixed(2).replace('.', ',')}</h1>
                      </label>
                      <button onClick={() => deleteItem(product.id)} className='border-black w-full text-sm bg-black text-white rounded p-2'>Remover do carrinho</button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1 className='text-white w-full text-center'>Nenhum produto encontrado!</h1>
      )}
    </div>
  );
}
