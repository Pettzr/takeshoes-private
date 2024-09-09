import { useEffect, useState } from "react";
import SelectVariant from "@/src/ui/components/SelectVariant";
import SelectedColor from "@/src/ui/client/SelectedColor";
import SelectedSizes from "@/src/ui/client/SelectedSizes";
import { IoCart } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useQueryClient } from '@tanstack/react-query';

export default function Product({ data }: any) {
    const [selectedVariant, setSelectedVariant] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
    const queryClient = useQueryClient();
    const session = useSession()

    useEffect(() => {
        if (data && Array.isArray(data.variant) && data.variant.length > 0) {
            setSelectedVariant(data.variant[0].color || "");
        }
    }, [data]);
    
    const handleSelect = (value: string) => {
        setSelectedVariant(value);
        setSelectedSize("");
        setSelectedQuantity(0)
    };

    const handleSizeSelect = (value: string) => {
        setSelectedSize(value) 
        setSelectedQuantity(0)
    };

    const handleQuantitySelect = (quantity: number) => setSelectedQuantity(quantity);

    const handleAddToCart = async () => {
        if(selectedSize && selectedQuantity !== 0 && session.status === 'authenticated') {
            try {
                const response = await fetch('/api/user/add-to-cart',{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body : JSON.stringify({user: session.data?.user.email, data: data.id ,size: selectedSize, variant: selectedVariant, quantity: selectedQuantity, })
                })
        
                const dataResponse = await response.json()
                
        
                if (response.ok) {
                    alert('Produto inserido no carrinho com sucesso!');
                } else {
                    console.error('Erro ao inserir o produto no carrinho:', dataResponse);
                    alert('Erro ao inserir produto no carrinho: ' + dataResponse.error);
                }

                queryClient.invalidateQueries({ queryKey: ['cart-icon'] });

            } catch (error) {
                console.error('Erro inesperado', error);
            }
        } else {
            selectedQuantity === 0 ? alert('Insira a quantidade desejada do produto') : session.status === 'authenticated' ? alert('Escolha um tamanho') : alert('Faça login')
        }
    }

    return (
        <div className="w-3/4 mt-[50px] border-2 border-black min-h-screen p-12 rounded">
            <h1 className=" w-full text-center text-xl font-bold">{data.name}</h1>
            <div className="flex justify-center w-full">
                <SelectVariant
                    variants={data.variant}
                    handleSelect={handleSelect}
                    showCreateOption={false}
                    selectedVariant={selectedVariant}
                />
            </div>
            <SelectedColor selectedColor={selectedVariant} variant={data.variant} />
            <SelectedSizes selectedColor={selectedVariant} variant={data.variant} handleSizeSelect={handleSizeSelect} handleQuantitySelect={handleQuantitySelect} />
            <div className="flex w-full justify-end items-center mt-8">
                <button onClick={handleAddToCart} className="h-[60px] w-[400px] bg-black text-white rounded-xl justify-end">
                    Adicionar ao carrinho
                </button>
                <IoCart color="white" size={35} className="relative right-16" />
            </div>
        </div>
    );
}
