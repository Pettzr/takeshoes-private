"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react"
import { IoMdHome } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuDoorOpen } from "react-icons/lu";
import { HiPencil } from "react-icons/hi";


export default function NavBar() {
    let options = ['Produtos']

    return (
        <div className="flex my-[10px] bg-black w-full items-center text-white">
            {options.map((option, index) => (
                <h1 className="w-full mx-1/10">{option}</h1>
            ))}
        </div>
    )
}