import Link from "next/link";
import { CiSquarePlus } from "react-icons/ci";

export default function AddColor({ variant, slug }: DataVariantsProps) {
    return (
        <div className="flex row gap-4 mb-[100px] w-full justify-start flex-wrap">
            {variant?.map(variant => (
            <Link 
            href={`/admin/${slug}/${variant.color}`} 
            key={variant.color} 
            className='flex w-[100px] h-[40px] bg-black text-white ml-[100px]  rounded-lg mt-[50px] justify-center items-center'>{variant.color}
            </Link>
            ))}
            <Link 
            href={`/admin/${slug}/criar-cor`} 
            className=" text-white/60 mt-[50px] mr-[100px] ">
                <CiSquarePlus size={40} color="black"/>
            </Link>
        </div>
    )
}