"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function NavBar() {
    let options = ['Clique aqui para ver nossos produtos!']

    return (
        <div className="flex w-screen justify-center">
            {options.map((option, index) => (
                <Link href={'/camisas'} key={option} className="flex w-full justify-center">
                    <div  className="flex p-2 gap-[10px] items-center border-gray-400 text-xl skeleton">
                        <FaArrowRight />
                        <h1 className="text-center" >{option}</h1>
                    </div>
                </Link>
            ))}
        </div>
    )
}