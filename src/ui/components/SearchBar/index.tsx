import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBar({ onSearch }: {onSearch: (results: any[]) => void}) {
    const [searchTerm, setSearchTerm] = useState('')

    const mutation = useMutation({
        mutationKey: ['products'],
        mutationFn: async (term: any) => {
            const response = await fetch('/api/products/search', {  
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: term }),
            });
            return  response.json()
        },
        onSuccess: (data) => {
            onSearch(data);
            console.log("Search results:", data)
        },
        onError: (error) => {
            console.log("Search error:", error)
        }
    })
    const onSubmit = async (event: any) => {
        event.preventDefault();
        if(searchTerm.trim() !== '' || searchTerm === '') {
            await mutation.mutateAsync(searchTerm);
        }
    }
    const onChange = (event: any) => {
        setSearchTerm(event.target.value)
    }

    return (
        <form method="POST"  onSubmit={onSubmit} className="flex flex-col w-full items-center">
            <h1 className="text-3xl text-center w-full mt-[100px] font-bold">Dê uma olhada em nossos produtos!</h1>
            <div className="flex relative w-full items-center justify-center"> 
                <input 
                className="p-2 pr-3 bg-gray border border-black/80 border-2 w-1/3 mt-[50px] text-xl rounded" 
                placeholder="Digite o produto desejado..."
                onChange={onChange}
                />
                <IoSearch className="relative top-6 right-10 h-[30px] w-[30px]"/>
            </div>
        </form>
    )
}