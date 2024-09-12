'use client';

import { TbShoppingBag } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

export function HomeSkeleton() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-full mb-[100px]">
                <h1 className="text-center text-black text-2xl font-bold mt-[50px]">Olá, seja bem-vindo a nossa loja!</h1>
                <CarouselSkeleton />
                <NewsSkeleton />
                <div className="flex flex-col w-full min-h-screen">
                    <HomeProductsSkeleton />
                </div>
            </div>
        </div>
    )
}

export function CarouselSkeleton () {
    return (
        <div className='flex w-full justify-center mt-20 '>
            <Slider {...settings} className='w-3/4 min-h-[600px] rounded-lg bg-black/10 skeleton'>
                <></>
                <></>
                <></>
                <></>
            </Slider>
        </div>
    )
}

export function NewsSkeleton () {
    return (
        <div className="flex justify-center overflow-x-auto my-[250px]">
            <div className="w-[350px] ml-8 overflow-y-hidden h-[350px] bg-black/40 skeleton"></div>
            <div className="w-[350px] ml-8 overflow-y-hidden h-[350px] bg-black/40 skeleton"></div>
            <div className="w-[350px] ml-8 overflow-y-hidden h-[350px] bg-black/40 skeleton"></div>
            <div className="w-[350px] ml-8 overflow-y-hidden h-[350px] bg-black/40 skeleton"></div>
        </div>
    )
}

export function HomeProductsSkeleton () {
    const products = Array(12).fill('');
    return(
        <div className="min-h-screen skeleton ">
            <div className="flex w-full justify-center ">
                <div className="p-7 bg-black text-black w-1/3 my-[100px] " />
            </div>
            <div>
                <div className='flex gap-[30px] w-3/4 mx-auto justify-start flex-wrap'>
                    {products.map((product: any) => (
                    <div key={product.name} className='flex flex-col items-center basis-1/6 mr-auto'>
                        <h1 className='w-full text-black text-center'>{product.name}</h1>
                        <div className='max-h-[300px] min-h-[300px] min-w-[400px] max-w-[400px] bg-black/40' />
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function CartSkeletonLogout () {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col skeleton items-center justify-center">
                <TiShoppingCart className=' text-center' size={250} />
            </div>
      </div>
    )
}
 
export function AdminSkeleton () {
    const products = Array(16).fill('');
    return(
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex text-white justify-center mt-14">
                <div className="flex flex-col border-2 w-[600px] gap-2">
                {products.map((product) => (
                    <table key={product} className="flex row bg-white/10 p-6 items-center ">
                    </table>
                ))}
                </div>
            </div>
        </div>
    )
}

export function ProductSkeleton () {

    return (
    <div className="w-[1000px] h-[700px] mt-[200px] border-2 border-white">
        <div className="relative left-48 ">
         <div className="ml-[200px] mt-[50px]"></div>
        </div>
    </div>
    )
}

export function PurchaseHistorySkeleton () {

    return(
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col skeleton items-center justify-center">
            <TbShoppingBag className=' text-center' size={250}/>
        </div>
    </div>
    )
}