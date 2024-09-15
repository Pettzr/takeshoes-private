// components/SlickCarousel.tsx
import Image from 'next/image';
import React from 'react';
import Slider, { Settings } from 'react-slick';

interface SlickCarouselProps {
  images: string[];
  settings: Settings;
}

export default function SlickCarousel({ images, settings }: SlickCarouselProps) {
  return (
    <Slider {...settings} className='w-full'>
      {images.map((image, index) => (
          <Image key={image} src={image} alt={`Slide ${index}`} width={2000} objectFit='cover' height={500} className='h-[800px]'/>
      ))}
    </Slider>
  );
};
