import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type productProps = {
  products?: any,
  onPageChange?: any,
  totalProducts?: any, 
  itemsPerPage?: any, 
  currentPage?: any,
  deleteItem?: any,
  changeQuantity?: any,
}

export default function Products({ products, onPageChange, totalProducts, itemsPerPage, currentPage, deleteItem, changeQuantity }: productProps) {
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const quantityOptions = (maxQuantity: number) => {
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  };

  return (
    <div className='w-full'>
      {products.length > 0 ? (
        <>
          <div className="flex gap-[30px] w-3/4 mx-auto justify-start flex-wrap">
            {products.map((product: any) => {
              const options = quantityOptions(product.size?.quantity || 0);
              return (
                <div
                  key={product.product ? product.product.name : product.name}
                  className="flex flex-col items-center basis-1/6 mr-auto border-x border-t border-black"
                >
                  <Link href={`/explorar/${product.product ? product.product.slug : product.slug}`}>
                    <h1 className="w-full text-black text-center">{product.name}</h1>
                    <Image
                      src={
                        Array.isArray(product.variant)
                          ? product.variant[0]?.images[0]
                          : product.variant?.images[0]
                      }
                      alt="Frente Da Camisa"
                      width={500}
                      height={0}
                      className="max-w-[300px] h-[250px] border-y border-black"
                    />
                    {!changeQuantity ? <h1 className="w-full text-black text-center">R${product.variant[0].price.toFixed(2)}</h1>
                    : null}
                  </Link>
                  {changeQuantity ? (
                    <div className="w-full flex flex-col items-center bg-white">
                      <h4 className="text-black p-1">Tamanho: {product.size?.size}</h4>
                      <div className="flex w-full justify-evenly items-center text-black border-y border-black p-1">
                        <h4>Quantidade:</h4>
                        <select
                          onChange={(e) => changeQuantity(product.productId, product.sizeId, product.variant.color, e)}
                          className='text-black bg-black/20 rounded'
                          value={product.quantity}
                        >
                          {options.map((quantity: any) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>
                      </div>
                      <h1 className='text-black'>Preço: R${(product.variant.price * product.quantity).toFixed(2)}</h1>
                      <button onClick={() => deleteItem(product.id)} className='border-y border-black w-full'>Tirar do carrinho</button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className='flex w-full justify-center'>
            <div className="flex mt-[50px]">
              <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 text-white bg-black rounded-l">
                Anterior
              </button>
              <span className="px-4 py-2 text-white bg-black">
                {currentPage} de {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 text-white bg-black rounded-r">
                Próximo
              </button>
            </div>
          </div>
        </>
      ) : (
        <h1 className='text-white w-full text-center'>Nenhum produto encontrado!</h1>
      )}
    </div>
  );
}
