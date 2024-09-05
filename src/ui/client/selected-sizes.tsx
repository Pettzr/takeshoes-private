import { useMemo, useState } from "react";

interface Size {
    id: string;
    size: string;
    variantId: string;
    quantity: number;
    price: number;
}

interface SelectedSizesProps {
    selectedColor: string;
    variant: any[];
    handleSizeSelect: (value: string) => void;
    handleQuantitySelect: (value: number) => void;
}

export default function SelectedSizes({ selectedColor, variant = [], handleSizeSelect, handleQuantitySelect }: SelectedSizesProps) {
    const [selectedSizeId, setSelectedSizeId] = useState<string>("");
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [quantityValue, setQuantityValue] = useState<number>(0);

    const sizes = useMemo(() => {
        if (!Array.isArray(variant)) return [];
        const selectedVariant = variant.find((variant: any) => variant.color === selectedColor);
        console.log('Selected Variant:', selectedVariant); // Depuração
        return selectedVariant ? selectedVariant.sizes : [];
    }, [selectedColor, variant]);

    console.log('Sizes:', sizes); // Depuração

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSizeId = e.target.value;
        console.log('Selected Size ID:', selectedSizeId); // Depuração
        setSelectedSizeId(selectedSizeId);
        handleSizeSelect(selectedSizeId);

        const size = sizes.find((size: Size) => size.id.toString() === selectedSizeId );
        setAvailableQuantity( size ? size.quantity : 0 );
        handleQuantitySelect(0);
        setQuantityValue(0)
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = parseInt(e.target.value, 10);
        handleQuantitySelect(quantity);
        setQuantityValue(quantity);
    };

    const selectedSize = useMemo(() => {
        // Força a comparação como string
        const size = sizes.find((size: Size) => size.id.toString() === selectedSizeId);
        console.log('Selected Size:', size); // Depuração
        return size || null;
    }, [sizes, selectedSizeId]);

    const selectedPrice = useMemo(() => {
        if (!Array.isArray(variant)) return [];
        const selectedVariant = variant.find((variant: any) => variant.color === selectedColor);
        console.log('Selected Variant:', selectedVariant); // Depuração
        return selectedVariant ? selectedVariant.price : [];
    }, [selectedColor, variant ]);

    return (
        <div>
            <div>
                <select onChange={handleChange} value={selectedSizeId}>
                    <option value="" disabled>Selecione o tamanho</option>
                    {sizes.map((size: Size) => (
                        <option key={size.id} value={size.id}>
                            {size.size}
                        </option>
                    ))}
                </select>
            </div>
                <div>
                { selectedSize && (
                <div>
                    <h4 className="text-white">Quantidade:</h4>
                    <select onChange={handleQuantityChange} value={quantityValue}>
                        <option value={0}>0</option>
                        {[...Array(availableQuantity)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
                )}
                {availableQuantity === 0 && selectedSize && (
                    <h2>Estoque indisponível</h2>
                )}
            </div>
            <div>
                {selectedPrice !== null ? (
                    <h1 className="text-white">Preço: R$ {selectedPrice * quantityValue}</h1>
                ) : (
                    <h1 className="text-white">Selecione um tamanho para ver o preço</h1>
                )}
            </div>
        </div>
    );
}
