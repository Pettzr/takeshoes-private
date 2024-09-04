"use client"

import NavAdmin from "@/src/ui/admin/NavAdmin";
import Image from "next/image";
import { CldUploadButton } from 'next-cloudinary';
import { uploadPresetHome } from '@/src/lib/cloudinary';
import { useEffect, useState } from "react";

export default function Page() {
  const [images, setImages] = useState<any[]>([]);

  console.log('imagens puxadas: ', images)
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/carousel/get-image', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchImages();
  }, []);

const handleUpload = (result: any, index: number) => {
    if (result.event === "success") {
      setImages((prevImages) => {
        const newImageUrl = result.info.secure_url;
        const newImages = [...prevImages];
        newImages[index] = newImageUrl;
       return newImages;
      });
    }
  };

  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    document.documentElement.style.paddingRight = '0px';
  
    requestAnimationFrame(() => {
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.paddingRight = '';
    });
  }, [images]);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/carousel/update-image", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: images,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Imagem atualizada com sucesso no banco de dados!");
    } catch (error) {
      console.error("Erro ao atualizar a imagem no banco de dados:", error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center min-h-screen mb-[200px] ">
      <NavAdmin />
        <div className="flex flex-col gap-4 mt-[100px] ">
          {images?.map((image, index: any) => (
            <div className="flex text-white gap-8 items-center overflow-y-hidden" key={image}>
              <div className="relative h-[400px] w-[900px]">
                <Image src={image} alt={`Carousel image ${index}`} 
                  layout="fill" objectFit="cover"/>
              </div>
              <CldUploadButton
                uploadPreset={uploadPresetHome}
                onSuccess={(result) => handleUpload(result, index)}
                className="p-4 bg-black max-w-[100px] max-h-[100px] rounded-3xl"
              >
                Enviar foto
              </CldUploadButton>
            </div>
          ))}
          <button className="p-4 bg-black w-[200px] max-h-[100px] rounded-3xl text-white self-center" onClick={handleSave}>
            Salvar Fotos
          </button>
      </div>
    </div>
  );
}

