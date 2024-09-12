import { useQuery } from "@tanstack/react-query";
import { TbShoppingBagExclamation } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PurchaseHistorySkeleton } from "../../components/Skeletons";

export default function PurchaseHistory() {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["purchaseProducts"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/user/get-purchase-history");
        if (!response.ok) {
          throw new Error("Erro ao buscar histórico de compras");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setProducts(data);
      }
    }
  }, [data]);

  console.log(products.length)

  if (isPending) return <PurchaseHistorySkeleton/>;
  if (error) return "An error has occurred: " + error.message;
  if (!data) return <h1>Data not found</h1>;
    return(
        <div className='w-full '>
        {products.length > 0 ? (
          <>
            <div className="flex w-76/100 mx-12/100 justify-center p-8 flex-wrap">
              {currentProducts.map((product: any) => {
                return (
                  <div
                    key={product.product ? product.product.name : product.name}
                    className="flex items-center justify-center max-w-full border-black p-4" 
                  >
                    <Link href={`/${product.product ? product.product.slug : product.slug}`} className='flex items-center max-h-[300px] min-h-[300px] min-w-[200px] max-w-[200px] '>
                      <h1 className="w-full text-black text-center text-2xl font-bold mb-[20px]">{product.name}</h1>
                      <Image
                        src={
                          Array.isArray(product.variant)
                            ? product.variant[0]?.images[0]
                            : product.variant?.images[0]
                        }
                        alt="Frente Da Camisa"
                        width={500}
                        height={0}
                        className="w-full border-2 border p-4 h-[200px]"
                      />
                    </Link>
                      <div className="w-[400px] flex flex-col items-center justify-center bg-gray-300 h-[200px] p-4 gap-4">
                        <label className='flex gap-4'>
                          Tamanho:
                        <h4 className="text-black">{product.size?.size}</h4>
                        </label>
                        <div className="flex w-full justify-center items-center text-black border-black p-1">
                          <h4 className='mr-[15px]'>Quantidade:</h4>
                          <h5>{product.quantity}</h5>
                        </div>
                        <label className='flex'>
                          Preço: 
                          <h1 className='text-black ml-[15px]'>R${(product.variant.price * product.quantity).toFixed(2).replace('.', ',')}</h1>
                        </label>
                      </div>
                      <div className="flex bg-black h-[200px] p-2 text-white items-center">
                        Enviando...
                      </div>
                  </div>
                );
              })}
            </div>
            <div className="flex mb-[30px] h-[30px] justify-center text-lg">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex w-auto p-4 text-white items-center bg-black rounded-l"
            >
              Voltar
            </button>
            <span className="flex items-center p-4 text-white bg-black">
              {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex w-auto p-4 text-white items-center bg-black rounded-r"
            >
              Próximo
            </button>
          </div>
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <TbShoppingBagExclamation className=' w-full text-center' size={150}/>
            <h1 className=' w-full text-center text-3xl	'>Você ainda não realizou nenhum pedido!</h1>
          </div>
        )}
      </div>
    )
}