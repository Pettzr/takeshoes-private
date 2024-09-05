'use client';

import { NextPage } from 'next';
import SlickCarousel from '@/src/ui/components/SlickCarousel';
import { useEffect, useState } from 'react';
import { CarouselSkeleton } from '@/src/ui/components/Skeletons';

const MarketingCarousel: NextPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

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
        setLoading(false);
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
    loading ? <CarouselSkeleton/> :
    <div className='flex w-full justify-center mt-20 '>
      <div className='w-[900px]'>
        <SlickCarousel images={images} settings={marketingCarouselSettings}/>
      </div>
    </div>
  );
};

export default MarketingCarousel;
