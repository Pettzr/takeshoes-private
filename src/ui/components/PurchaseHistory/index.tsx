import { useQuery } from "@tanstack/react-query"

export default function PurchaseHistory () {
    const {data, isLoading, error} = useQuery({
        queryKey: ['purchaseProducts'],
        queryFn: async () => {
            try{
                const response = await fetch('/api/user/get-purchase-history')
                if (!response.ok) {
                    throw new Error('Erro ao buscar histórico de compras');
                }
                const data = await response.json();
                return data
            } catch (error) {
                console.error(error);
            }
        }
    })

    console.log(data)

    return(
        <h1>olá</h1>
    )
}