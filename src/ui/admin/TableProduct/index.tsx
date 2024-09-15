import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function TableAdmin({ data }: any) {
    const queryClient = useQueryClient()

    const handleDeleteProduct = async(id: number) => {
        fetch(`/api/products/delete-product`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        queryClient.invalidateQueries({queryKey: ['products']})
    }
  
    return (
    <div className="flex flex-col text-white justify-center items-center">
        <div className="flex flex-col border-2 w-auto gap-2 border border-black p-12 items-center">
            {data.length > 0 && 
            data.map((product: any) => (
                <div key={product.id} className="border border-black">
                    <table className="flex row bg-black/10  p-2 items-center ">
                        <tbody className="">
                            <tr className="">
                                <td className="flex row gap-4 w-[600px]">
                                    <h1 className='text-black w-3/4 cursor-default' >Produto: {product.name} </h1>
                                    <Link href={`/admin/${product.slug}/${product.variant[0]?.color}`}>
                                    <button
                                    className='bg-blue-400 px-3 py-1'> 
                                        Editar
                                    </button>
                                    </Link>
                                    <button  
                                    className='bg-red-400 px-3 py-1 mr-[20px]'
                                    onClick={() => handleDeleteProduct(product.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                                </tr>
                        </tbody>
                     </table>      
                </div>
            ))}
        </div>
    </div>
    )
}

