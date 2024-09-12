import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import SizeManager from '@/src/ui/admin/SizeManager';
import ImageManager from '@/src/ui/admin/ImageManager';
import ActionButtons from '@/components/ActionsButtons';
import PriceManager from '@/src/ui/admin/PriceManager';

export default function EditVariant({ slug, color, variant }: SelectedVariant) {
  const [price, setPrice] = useState<any>()
  const [sizes, setSizes] = useState<SizeData[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const updatedVariant = variant?.filter((v) => v.color === color) || [];
    setSizes(updatedVariant.flatMap((v) => v.sizes));
    setImages(updatedVariant.flatMap((v) => v.images));
    setPrice(updatedVariant.map((v) => v.price.toFixed(2).replace('.', ',')))
  }, [variant, color]);
  
  const handleAddSize = async () => {
    const newSize = prompt('Digite o novo tamanho:')?.toUpperCase();
    if (newSize && !sizes.some((size) => size.size === newSize)) {
      const newSizeData: SizeData = { size: newSize, quantity: 0 };
      const oldSizes = [...sizes]
      const updatedSizes = [...sizes, newSizeData];
      setSizes(updatedSizes);
      
      const response = await fetch(`/api/products/variants/${slug}/create-size/${color}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size: newSizeData }),
      });
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['productBySlug', slug] });
      } else {
        setSizes(oldSizes);
        queryClient.invalidateQueries({ queryKey: ['productBySlug', slug] });
      }
    }
  };

  const handleDeleteSize = async (id: number) => {
    if (window.confirm('Deseja deletar este tamanho?')) {
      const oldSizes = [...sizes]
      const updatedSizes = sizes.filter((size) => size.id !== id);
      setSizes(updatedSizes);
      const response = await fetch(`/api/products/variants/${slug}/delete-size/${color}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['productBySlug', slug] }); // Invalida a query correta
      } else {
        console.error('Erro ao deletar o tamanho:', await response.text());
        setSizes(oldSizes);
        queryClient.invalidateQueries({ queryKey: ['productBySlug', slug] });
      }
    }
  };

  const handleUpdateImageZero = (result: CloudinaryUploadWidgetResults) => {
    const { info } = result;
    if (info && typeof info !== 'string' && 'secure_url' in info) {
      const newImageUrl = info.secure_url;
      setImages((prevImages) =>
        prevImages.map((image, index) => (index === 0 ? newImageUrl : image))
      );
    }
  };

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    const { info } = result;
    if (info && typeof info !== 'string' && 'secure_url' in info) {
      const newImageUrl = info.secure_url;
      setImages((prevImages) => [...prevImages, newImageUrl]);
    }
  };

  const handleSaveImages = async () => {
    fetch(`/api/products/variants/${slug}/update-images/${color}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images }),
    });
  };

  const handleDeleteVariant = async () => {
    if (window.confirm('Deseja deletar esta cor?')) {
      try {
        const response = await fetch(`/api/products/variants/${slug}/delete-variant/${color}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (response.ok) {
          queryClient.invalidateQueries({ queryKey: ['productBySlug', slug] });
          if (result.productDeleted) {
            router.push('/admin');
          } else {
            router.push(`/admin/${slug}/criar-cor`);
          }
        } else {
          console.error('Error deleting variant:', result.error);
        }
      } catch (error) {
        console.error('Error deleting variant:', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <PriceManager
        price={price}
        setPrice={setPrice}
        slug={slug}
        color={color}
      />
      <SizeManager
        sizes={sizes}
        setSizes={setSizes}
        handleAddSize={handleAddSize}
        handleDeleteSize={handleDeleteSize}
      />
      <ImageManager
        images={images}
        handleUpdateImageZero={handleUpdateImageZero}
        handleImageUpload={handleImageUpload}
        handleDeleteImage={(index) => setImages((prev) => prev.filter((_, i) => i !== index))}
      />
      <ActionButtons handleSaveImages={handleSaveImages} handleDeleteVariant={handleDeleteVariant} />
    </div>
  );
}
