import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NewsSkeleton } from '@/components/Skeletons';
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

    const {data } = useQuery({
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
        <div className='flex w-full justify-center mt-[120px] '>
            <div className='w-full flex flex-col items-center'>
                <h1 className='w-full text-center text-black mb-[70px] text-4xl font-bold'>Últimas Novidades</h1>
                {loading ? <NewsSkeleton/> :
                <div className='flex overflow-x-auto gap-8 border-black w-75/100 justify-around overflow-y-hidden h-auto'>
                    {images.map((item, index) => (
                        <div key={index} className='flex flex-col '>
                            <Link href={`/camisas/${item.slug}`} className='flex p-4 flex-col space-around gap-4 min-h-auto'>
                                <h2 className='text-black text-center text-xl font-bold '>{item.name}</h2>
                                <Image
                                 src={item.image[0]} 
                                 alt={`Notícia ${index}`}  
                                 objectFit='cr' 
                                 width={1080}
                                 height={0}
                                 className="w-[300px] p-4 max-h-[400px] min-h-[400px] bg-[#EAEEEF]"
                                 />
                                 <h2 className='my-[5px] text-2xl font-bold text-center'>R${item.price.toFixed(2).replace('.', ',')}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>
    );
}
