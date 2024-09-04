import Link from "next/link";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="flex p-4 bg-black h-auto items-center">
            <div className="flex-col ml-[10px] text-white">
                <Link href={'https://github.com/Pettzr'} className="flex items-center flex-row-reverse whitespace-nowrap gap-2 text-sm">
                Peterson Github
                    <FaGithubSquare size={32} color="#B0B2BF" />
                </Link>
                <Link href={'https://github.com/crivelarohenrique'} className="flex items-center flex-row-reverse whitespace-nowrap gap-2 text-sm">
                Crivelaro Github
                    <FaGithubSquare size={32} color="#B0B2BF" />
                </Link>
            </div>
            <h1 className="w-full text-end mr-4 text-white text-sm">Desenvolvido por Peterson Gonçalves e Henrique Crivelaro.</h1>
        </div>
    )
}