import React, { useState } from "react";
import Cloudinary from "@/src/ui/components/Cloudinary";
import SizeInput from "@/src/ui/admin/SizeInput";
import { toast } from "react-toastify";

interface ProductFormProps {
  onSubmit: (data: any) => void;
  initialProductName?: string;
  initialProductColor?: string;
  initialProductPrice?: number;
  initialImages?: string[];
  initialSizes?: Sizes;
  showProductName?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  initialProductName = '',
  initialProductColor = '',
  initialProductPrice = 0,
  initialImages = [],
  initialSizes = {},
  showProductName = true,
}) => {
  const [productName, setProductName] = useState(initialProductName);
  const [productColor, setProductColor] = useState(initialProductColor);
  const [productPrice, setProductPrice] = useState(initialProductPrice);
  const [images, setImages] = useState(initialImages);
  const [sizes, setSizes] = useState(initialSizes);

  const handleSizeChange = (size: Size, field: keyof SizeData, value: number) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: {
        ...prevSizes[size],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (newImages: string[]) => {
    setImages(newImages);
  };

  const validateForm = () => {
    if (!productColor.trim() || images.length === 0 || (showProductName && !productName.trim())) {
      toast.error('Por favor preencha todos os campos!');
      return false;
    }
    
    if (Object.keys(sizes).length === 0) {
      toast.error('Por favor adicione pelo menos um tamanho!');
      return false;
    }

    for (const [size, data] of Object.entries(sizes)) {
      if (data.price <= 0) {
        toast.error(`O preço do tamanho ${size} deve ser maior que 0!`);
        return false;
      }
    }
  
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: productName,
      color: productColor,
      images: images,
      price: productPrice,
      sizes: Object.entries(sizes).map(([size, data]) => ({
        size,
        quantity: data.quantity,
      })),
    };

    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center p-12">
      <div className="flex flex-col w-[800px] items-center border-2 border-black">
        {showProductName && (
          <>
            <h1 className="text-black mt-[100px] text-2xl mb-4 font-bold">Nome do produto</h1>
            <input
              placeholder="Digite o nome do produto..."
              className="p-2 w-[300px] border-2 border-black/40"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </>
        )}
        <h1 className="text-black mt-[15px] text-2xl mb-4 font-bold">Cor do produto</h1>
        <input
          placeholder="Digite a cor do produto..."
          className="p-2 w-[300px] border-2 border-black/40"
          value={productColor}
          onChange={(e) => setProductColor(e.target.value)}
        />
        <h1 className="text-black mt-[15px] text-2xl mb-4 font-bold">Preço do Produto</h1>
        <input
          placeholder="Digite o preço do produto..."
          className="p-2 w-[300px] border-2 border-black/40"
          type="number"
          value={productPrice}
          onChange={(e: any) => setProductPrice(parseFloat(parseFloat(e.target.value).toFixed(2).replace('.', ',')))}
        />
        
        <Cloudinary onUploadSuccess={handleImageUpload} />
        <SizeInput sizes={sizes} onSizeChange={handleSizeChange} />
        <button type="submit" className="p-2 bg-black text-white my-[30px] rounded w-[300px]">Enviar</button>
      </div>
    </form>
  );
};

export default ProductForm;
