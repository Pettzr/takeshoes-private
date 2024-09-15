'use client';

import SlickCarousel from '@/src/ui/client/SlickCarousel';
import { useEffect, useState } from 'react';

export default function MarketingCarousel() {
  const [images, setImages] = useState<string[]>([]);

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
  
  const marketingCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col w-3/4'>
          <SlickCarousel images={images} settings={marketingCarouselSettings}/>
      </div>
    </div>
  );
};
