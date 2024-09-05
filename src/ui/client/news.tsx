import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NewsSkeleton } from '../components/Skeletons';
import { useQuery } from '@tanstack/react-query';

interface ImageWithName {
  image: string;
  name: string;
  slug: string;
  price: number
}

export default function News() {
    const [images, setImages] = useState<ImageWithName[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    const {data, isLoading, error} = useQuery({
        queryKey: ['productNews'],
        queryFn: async () => {
            try {
                const response = await fetch('/api/products/get-news');
                if (!response.ok) {
                    throw new Error('Erro ao buscar notícias');
                }
                const data: ImageWithName[] = await response.json();
                return data
            } catch (error) {
                console.error(error);
            }
        }
    })

    useEffect(() => {
        if(data){
            setImages(data);
            setLoading(false);
        }
      }, [data]);

    return (
        <div className='flex justify-center mt-[120px]'>
            <div>
                <h1 className='w-full text-center text-black mb-[70px] text-2xl font-bold'>Últimas Novidades</h1>
                {loading ? <NewsSkeleton/> :
                <div className='flex overflow-x-auto gap-4'>
                    {images.map((item, index) => (
                        <div key={index}>
                            <Link href={`/explorar/${item.slug}`} className='flex flex-col overflow-y-hidden items-center justify-center border border-black'>
                                <h2 className='text-black text-center text-xl'>{item.name}</h2>
                                <Image
                                 src={item.image[0]} 
                                 alt={`Notícia ${index}`}  
                                 objectFit='cover' 
                                 width={250}
                                 height={0}
                                 className="w-[250px] h-[300px]"
                                 />
                                 <h2 className='my-[5px] text-lg'>R${item.price.toFixed(2)}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>
    );
}
