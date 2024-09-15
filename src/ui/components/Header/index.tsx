'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { RiShoppingCartLine } from "react-icons/ri";

import { IoSearch } from "react-icons/io5";

export default function Header() {
    const [search, setSearch ] = useState('')
    const router = useRouter()
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const handleMouseEnter = () => {
    setShowUserDropdown(true)
    console.log('oi')
    }
    const handleMouseLeave = () => setShowUserDropdown(false);
  


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (search.trim()) {
            router.push(`/search?q=${encodeURIComponent(search)}`)
        }
    }
    

    return (
        <div className="flex flex-col bg-black h-auto px-[100px] ">
            <div className="flex justify-between items-center">
                <div className="w-1/3">
                    <Link href={'/'}>
                        <Image src='https://res.cloudinary.com/dgzosykzw/image/upload/v1726238720/takeshoes_images/tenis_branco_rwxtwt.png' alt="logo-site" width={110} height={110} />
                    </Link>
                </div>
                <form className="relative w-1/3 flex justify-center" onSubmit={handleSubmit}>
                    <input className="w-full rounded-full px-[15px] py-1" type="text" id="search" name="q" value={search} onChange={handleChange} placeholder="Pesquisar..." />
                    <IoSearch className="absolute top-[6px] right-[10px]" size={20} type="submit"/>
                </form>
                <div className="flex justify-end w-1/3 h-full">
                    <div className="relative bg-white flex w-[200px] rounded-full justify-around items-center py-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Link className="flex justify-center items-center gap-2 text-sm" href={'/entrar'}>
                            <FiUser size={25}/>
                            <h1>Sua Conta</h1>
                        </Link>
                        {showUserDropdown && (
                        <div className="dropdown-menu absolute top-8 right-0     bg-white shadow-md rounded-md px-2 py-1">
                            <Link href="/historico-pedidos" className="dropdown-item block py-1 px-2 hover:bg-gray-200 rounded-md">
                            Histórico de Pedidos
                            </Link>
                            <Link href="/carrinho" className="dropdown-item block py-1 px-2 hover:bg-gray-200 rounded-md">
                            Carrinho
                            </Link>
                            <Link href="/deslogar" className="dropdown-item block py-1 px-2 hover:bg-gray-200 rounded-md">
                            Deslogar
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 