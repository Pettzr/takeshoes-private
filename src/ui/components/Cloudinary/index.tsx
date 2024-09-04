import React, { useState } from 'react';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { uploadPreset } from '@/src/lib/cloudinary';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

export default function Cloudinary({ onUploadSuccess }: CloudinaryProps) {
  const [images, setImages] = useState<string[]>([]);

  // Atualizando a função para aceitar o tipo correto
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const { info } = result;
    if (info && typeof info !== 'string' && 'secure_url' in info) {
      const newImageUrl = info.secure_url;

      setImages((prevImages) => {
        const updatedImages = [...prevImages, newImageUrl];
        onUploadSuccess(updatedImages);
        return updatedImages;
      });
    }
  };
  
  const handleImageDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    onUploadSuccess(newImages); 
  };

  return (
    <div className='flex flex-col border-b-2'>
      <div className='flex row border-b-2 justify-center'>
        <div className='flex flex-col items-center p-4'>
          <h1 className='text-black text-2xl mb-4 font-bold'>Imagens</h1>
          <div className='flex gap-4'>
            {images.map((image, index) => (
              <div key={index} className='relative w-[150px] h-[200px] mb-4'>
                <Image
                  src={image}
                  alt="Imagem do produto"
                  layout='fill'
                  objectFit='cover'
                />
                <button
                  onClick={() => handleImageDelete(index)}
                  className='absolute top-2 right-2 bg-red-500 text-black rounded-full p-1'
                >
                  <MdDelete />
                </button>
              </div>
            ))} 
          </div>
          <CldUploadButton
            uploadPreset={uploadPreset}
            onSuccess={handleUploadSuccess}
            className='p-2 text-white'
          >
            <FaPlus size={50} color='black'/>
          </CldUploadButton>
        </div>
      </div>
    </div>
  );
}
