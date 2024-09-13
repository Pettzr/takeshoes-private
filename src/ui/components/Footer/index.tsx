import Link from "next/link";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="flex p-4 bg-black h-auto">
            <div className="flex border-white/20 border-2 w-full p-4 px-32">
                <div className="text-white">
                    <h1 className="text-xl">Produtos</h1>
                    <h2 className="text-md mt-[5px] ml-[5px]">Camisas</h2>
                </div>
                <h1 className="flex items-center w-full justify-center text-center h-full text-white text-sm">
                © 2024 Henrique Crivelaro & Peterson Gonçalves <br/>
                Todos os direitos reservados. </h1>
                <div className="flex-col text-white ml-auto whitespace-nowrap ">
                    <h1 className="text-white flex text-xl">Contato</h1>
                    <Link href={'https://github.com/Pettzr'} className="flex items-center gap-2 text-sm  mt-[5px] ml-[5px] hover:text-blue-400">
                    Peterson Github
                        <FaGithubSquare size={20} color="#B0B2BF" />
                    </Link>
                    <Link href={'https://github.com/crivelarohenrique'} className="flex items-center gap-2  text-sm mt-[5px] ml-[5px] hover:text-blue-400">
                    Crivelaro Github
                        <FaGithubSquare size={20} color="#B0B2BF" />
                    </Link>
                </div>
            </div>
        </div>
    )
}