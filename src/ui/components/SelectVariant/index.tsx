export default function SelectVariant({ variants = [], handleSelect, showCreateOption = true, selectedVariant }: SelectVariant) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleSelect(e.target.value);
    };
  
    if (!variants || variants.length === 0) {
      return <p>Nenhuma variante disponível</p>; // Renderizar algo diferente se não houver variantes
    }
  
    return (
      <div className="ml-[200px] mt-[50px]">
        <select 
          onChange={handleChange} 
          value={selectedVariant} 
          className="p-2 w-[200px] text-center"
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
  