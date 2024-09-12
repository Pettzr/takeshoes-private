import React from 'react';
import Image from 'next/image';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { HiPencilSquare } from "react-icons/hi2";
import { uploadPreset } from '@/src/lib/cloudinary';

interface ImageManagerProps {
  images: string[];
  handleUpdateImageZero: (result: CloudinaryUploadWidgetResults) => void;
  handleImageUpload: (result: CloudinaryUploadWidgetResults) => void;
  handleDeleteImage: (index: number) => void;
}

export default function ImageManager({
  images,
  handleUpdateImageZero,
  handleImageUpload,
  handleDeleteImage,
}: ImageManagerProps) {
  return (
    <div className='flex flex-col items-center'>
        <h1 className='text-3xl'>Imagens</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-5 mb-2">
            {images.map((image, index) => (
            <div key={index} className="relative w-[200px] h-[200px] border-2 rounded">
            <Image src={image} alt="Image" layout="fill" objectFit="cover" />

            {index === 0 ? 
                <CldUploadButton
                uploadPreset={uploadPreset}
                onUpload={handleUpdateImageZero}
                className="absolute top-0 right-0 cursor-pointer"
                >
                <HiPencilSquare color="blue" />
                </CldUploadButton>
            : 
                <FaTrash
                className="absolute top-0 right-0 cursor-pointer"
                color="red"
                onClick={() => handleDeleteImage(index)}
                /> }
            </div>
            ))}
            <CldUploadButton uploadPreset={uploadPreset} onUpload={handleImageUpload}>
                <FaPlus size={30} color="black" />
            </CldUploadButton>
        </div>
    </div>
  );
}
