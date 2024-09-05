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
    const { data: session } = useSession()
    const pathname = usePathname()
    let icons = session?.user.role === "admin" ? [IoMdHome, TiShoppingCart, FaUser, MdAdminPanelSettings ] : session ? [ IoMdHome, TiShoppingCart, FaUser ] : [IoMdHome, TiShoppingCart, LuDoorOpen, HiPencil   ]
    let links = session?.user.role === "admin" ? ["/", "/carrinho", '/perfil' ,"/admin" ] : session ? ["/", "/carrinho", '/perfil' ] : ["/", "/carrinho", '/entrar', '/cadastrar' ]
    let pages = session?.user.role === "admin" ? ['Início', 'Carrinho', 'Perfil', 'Admin' ] : session ? ['Início', 'Carrinho', 'Perfil' ] : ['Início', 'Carrinho', 'Login', 'Cadastrar-se' ]

    return (
        <div className="flex bg-black w-full items-center">
            <ul className="flex w-full justify-center text-white text-center ">
                {icons.map((IconComponent, index) => (
                    <Link href={links[index]} key={index} >
                        <li className={clsx(
                            'flex cursor-pointer h-[40px] w-[200px] justify-center hover:bg-blue-500 items-center gap-4',
                            links[index] === pathname? "bg-blue-700 text-white" : "",
                        )}>
                            <IconComponent size={25} color="white" />
                            <h1 className="h-full flex items-center justify-center">{pages[index]}</h1>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}