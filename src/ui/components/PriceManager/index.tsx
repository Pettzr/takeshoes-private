

import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

interface PriceManagerProps {
  price: number
  color?: string 
  slug: string
  setPrice: React.Dispatch<React.SetStateAction<number>>
}

export default function PriceManager({price, color, slug, setPrice}: PriceManagerProps) {
  const queryClient = useQueryClient()

  const handleInputSave = async (price: number) => {
    await fetch(`/api/products/variants/${slug}/update-price/${color}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({price}),
    });
    queryClient.invalidateQueries({ queryKey: ['productBySlug'] });
  };

  return (
    <div className='flex flex-col items-center gap-[14px]'>
        <h1 className='text-3xl'>Preço</h1>
          <input
            className="p-2 ml-[30px] text-center border-2"
            type="number"
            value={price}
            onChange={(e: any) => setPrice(parseFloat(parseFloat(e.target.value).toFixed(2).replace('.', ',')))}
          />
          <button
            className="bg-black text-white p-1 ml-[30px] w-[100px] rounded-lg"
            onClick={() => handleInputSave(price)}
          >
            Salvar
          </button>
    </div>
  )
}
