"use client"
import NavAdmin from "@/src/ui/admin/NavAdmin";
import ProductForm from "@/src/ui/admin/ProductForm";

export default function Page() {
  const handleProductSubmit = async (productData: any) => {
    try {
      const response = await fetch('/api/products/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Produto criado com sucesso:', data);
        alert('Produto criado com sucesso');
      } else {
        console.error('Erro ao criar o produto:', await response.text());
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
  <div className="w-full flex flex-col items-center">
    <NavAdmin />
    <ProductForm onSubmit={handleProductSubmit} />
  </div>
  )
}
