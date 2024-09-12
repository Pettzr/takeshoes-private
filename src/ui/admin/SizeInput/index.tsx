import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function SizeInput({ sizes, onSizeChange }: SizeInputProps) {
  const [sizeKeys, setSizeKeys] = useState<string[]>([]);
  const [newSize, setNewSize] = useState<string>('');

  const handleAddSize = () => {
    if (newSize && !sizeKeys.includes(newSize)) {
      setSizeKeys((prevKeys) => [...prevKeys, newSize]);
      onSizeChange(newSize, 'quantity', 0);
      setNewSize(''); 
    }
  };

  const handleDeleteSize = (size: string) => {
    setSizeKeys((prevKeys) => prevKeys.filter((key) => key !== size));
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-center text-black text-2xl mb-8 mt-24 font-bold">Tamanhos</h1>
      {sizeKeys.map((size) => (
        <div key={size}>
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-center mt-[10px]">{size}</h1>
            <div className="flex border-2 w-[400px] p-2 justify-center items-center">
              <label className="w-[100px] mr-[5px]">Quantidade: </label>
              <input
                placeholder="0"
                className="p-1 w-[50px] border-2"
                required
                type="number"
                value={sizes[size]?.quantity}
                onChange={(e) => onSizeChange(size, 'quantity', parseFloat(e.target.value))}
              />
              <FaTrash
                className="ml-4 cursor-pointer"
                size={20}
                color="red"
                onClick={() => handleDeleteSize(size)}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Novo tamanho"
          className="p-2 w-[300px] mr-2 ml-12 border-2 border-black/40"
          value={newSize}
          onChange={(e) => setNewSize(e.target.value.toUpperCase())}
        />
        <FaPlus className="cursor-pointer" size={35} color="black" onClick={handleAddSize} />
      </div>
    </div>
  );
}
