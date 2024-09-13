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
    let links = ["/entrar"]
    let pages = ['Início']

    return (
        <div className="flex bg-black w-full items-center text-white">
            {links.map((link, index) => (
                <Link href={link}>
                    <h1>{pages[index]}</h1>
                </Link>
            ))}
        </div>
    )
}