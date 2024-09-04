"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react"
import { IoMdHome } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuDoorOpen } from "react-icons/lu";
import { HiPencil } from "react-icons/hi";


export default function NavBar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    let icons = session?.user.role === "admin" ? [IoMdHome, IoIosSearch, TiShoppingCart, FaUser, MdAdminPanelSettings ] : session ? [ IoMdHome, IoIosSearch, TiShoppingCart, FaUser ] : [IoMdHome, IoIosSearch, TiShoppingCart, LuDoorOpen, HiPencil   ]
    let links = session?.user.role === "admin" ? ["/", "/explorar", "/carrinho", '/perfil' ,"/admin" ] : session ? ["/", "/explorar", "/carrinho", '/perfil' ] : ["/", "/explorar", "/carrinho", '/entrar', '/cadastrar' ]
    let pages = session?.user.role === "admin" ? ['Início', 'Explorar', 'Carrinho', 'Perfil', 'Admin' ] : session ? ['Início', 'Explorar', 'Carrinho', 'Perfil' ] : ['Início', 'Explorar', 'Carrinho', 'Login', 'Cadastrar-se' ]

    return (
        <div className="flex bg-black w-full items-center">
            <ul className="flex w-full justify-center text-white text-center ">
                {icons.map((IconComponent, index) => (
                    <Link key={index} href={links[index]}>
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