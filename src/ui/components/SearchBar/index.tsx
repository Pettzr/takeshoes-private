import { useMutation } from "@tanstack/react-query"
import { useState } from "react";

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
            <h1 className="text-4xl text-center w-full mt-[100px] font-bold">Dê uma olhada em nossos produtos!</h1>
            <input 
            className="p-4 bg-black text-white w-1/3 mb-[100px] mt-[50px] text-3xl" 
            placeholder="Digite o produto desejado..."
            onChange={onChange}
            />
        </form>
    )
}