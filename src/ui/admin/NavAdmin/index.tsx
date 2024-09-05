import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavAdmin() {
    const links = ['/admin',  '/admin/registrar-produto', '/admin/editar-home']
    const pages = ['Admin', 'Registrar Produto', 'Editar Home']
    const pathname = usePathname();
    return (
    <nav className="flex justify-center w-full mt-[45px]">
        <div className="flex justify-around bg-black rounded-lg">
            {links.map((link, index) => (
                <Link key={index} href={link} className={clsx(
                    "p-4 min-w-[150px] text-center text-white hover:bg-blue-500",
                    links[index] === pathname? "bg-blue-500 " : "",)}>
                    <h1>{pages[index]}</h1>
                </Link>
            ))}
        </div>
    </nav>
    )
}