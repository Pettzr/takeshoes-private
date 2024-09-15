'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiUserPlus } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { RiLoginBoxLine, RiShoppingCartLine, RiShieldUserLine, RiLogoutBoxLine } from "react-icons/ri";
import { IoBagHandleOutline } from "react-icons/io5";



export default function Header() {
    const [search, setSearch ] = useState('')
    const session = useSession();
    const queryClient = useQueryClient();
    const router = useRouter()
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const handleMouseEnter = () => {
    setShowUserDropdown(true)
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

    const handleLogout = async () => {
        await signOut({redirect: false});
        queryClient.invalidateQueries({ queryKey: ['cart-icon'] });
        router.push('/');
    }

    const links = session.data?.user.role === 'admin' ? ['/historico', '/carrinho', '/admin'] : session.status === 'authenticated' ? ['/historico-pedidos', 'carrinho'] :  ['/entrar', '/cadastrar'];
    const pages = session.data?.user.role === 'admin' ? ['Histórico de Pedidos', 'Carrinho', 'Admin'] : session.status === 'authenticated' ? ['Histórico de Pedidos', 'Carrinho'] : ['Fazer Login', 'Cadastrar'];
    const icons = session.data?.user.role === 'admin' ? [<IoBagHandleOutline/> , <RiShoppingCartLine/> , <RiShieldUserLine/>] : session.status === 'authenticated' ? [<IoBagHandleOutline/>, <RiShoppingCartLine/> ] : [<RiLoginBoxLine/>, <FiUserPlus/>];

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
                        {showUserDropdown &&
                        <div className="w-full flex flex-col dropdown-menu absolute top-8 left-0 bg-white shadow-2xl rounded-md p-1 gap-2 mt-[2px]">
                            {pages.map( (page, index) => (
                                <Link href={links[index]} className="flex items-center gap-3 hover:bg-black/10 p-2 rounded-md whitespace-nowrap">
                                    <h1 className="text-xl">{icons[index]}</h1>
                                    <h1>{page}</h1>
                                </Link>
                            ))}
                            {session.status === 'authenticated' && (
                                <button onClick={handleLogout} className="flex items-center gap-3 hover:bg-black/10 p-2 rounded-md whitespace-nowrap">
                                    <h1 className="text-xl"><RiLogoutBoxLine/></h1>
                                    Deslogar
                                </button>
                            )}
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
} 