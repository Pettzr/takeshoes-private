// components/SlickCarousel.tsx
import Image from 'next/image';
import React from 'react';
import Slider, { Settings } from 'react-slick';

interface SlickCarouselProps {
  images: string[];
  settings: Settings;
}

const SlickCarousel: React.FC<SlickCarouselProps> = ({ images, settings }) => {
  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className='relative min-h-[600px] overflow-x-hidden' >
          <Image src={image} alt={`Slide ${index}`} layout='fill' objectFit='fill' className='min-w-full ' />
        </div>
      ))}
    </Slider>
  );
};

export default SlickCarousel;
