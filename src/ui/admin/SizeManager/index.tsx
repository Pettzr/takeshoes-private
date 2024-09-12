import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface SizeManagerProps {
  sizes: SizeData[];
  setSizes: React.Dispatch<React.SetStateAction<SizeData[]>>;
  handleAddSize: () => void;
  handleDeleteSize: any;
}

export default function SizeManager({
  sizes,
  setSizes,
  handleAddSize,
  handleDeleteSize,
}: SizeManagerProps) {
  const queryClient = useQueryClient()
  const handleQuantityChange = (id: number, quantity: number) => {
    setSizes((prevSizes) =>
      prevSizes.map((size) => (size.id === id ? { ...size, quantity } : size))
    );
  };

  const handleInputSave = async (sizeData: SizeData) => {
    await fetch(`/api/products/update-size`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sizeData),
    });
    queryClient.invalidateQueries({ queryKey: ['productBySlug'] });
  };

  return (
    <div className='flex flex-col items-center gap-[14px]'>
        <h1 className='text-3xl'>Tamanhos</h1>
        {sizes.map((size) => (
        <div
          key={size.id}
          className="flex gap-2 items-center border-2 p-4 border-black rounded"
        >
          <h1 className="text-black mr-[30px] w-[30px]">{size.size}</h1>
          <label className="text-black">Quantidade:</label>
          <input
            className="p-2 ml-[30px] text-center border-2"
            type="number"
            value={size.quantity}
            onChange={(e) => handleQuantityChange(size.id!, parseInt(e.target.value))}
          />
          <button
            className="bg-black text-white p-1 ml-[30px] w-[100px] rounded-lg"
            onClick={() => handleInputSave(size)}
          >
            Salvar
          </button>
          <FaTrash
            className="ml-4 cursor-pointer"
            size={25}
            color="red"
            onClick={() => handleDeleteSize(size.id!)}
          >Deletar</FaTrash>
        </div>
      ))}
      <FaPlus className="cursor-pointer" size={35} color="black" onClick={handleAddSize} />
    </div>
  );
}
