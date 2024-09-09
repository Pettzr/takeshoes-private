import Product from "../../client/Product";
import { ProductSkeleton } from "../Skeletons";

export default function SelectVariant({ variants = [], handleSelect, showCreateOption = true, selectedVariant }: SelectVariant) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleSelect(e.target.value);
    };
  
    if (!variants || variants.length === 0) {
      return <ProductSkeleton/>; // Renderizar algo diferente se não houver variantes
    }
  
    return (
      <div className=" my-[50px]">
        <select 
          onChange={handleChange} 
          value={selectedVariant} 
          className="p-2 w-[200px] text-center border border-black"
        >
          {showCreateOption && <option value="create">Criar</option>}
          {variants.map((variant: any) => (
            <option key={variant.id} value={variant.color}>
              {variant.color}
            </option>
          ))}
        </select>
      </div>
    );
  }
  