import { useEffect, useMemo, useState } from "react";

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
        console.log('Selected Variant:', selectedVariant); 
        return selectedVariant ? selectedVariant.sizes : [];
    }, [selectedColor, variant]);

    useEffect(() => {
        if (sizes.length > 0) {
            const firstSize = sizes[0];
            setSelectedSizeId(firstSize.id);
            setAvailableQuantity(firstSize.quantity);
            handleSizeSelect(firstSize.id);
        } else {
            setSelectedSizeId("");
            setAvailableQuantity(0);
        }
    }, [sizes]);

    useEffect(() => {
        if(availableQuantity > 0) {
            setQuantityValue(1)
        }
    }, [availableQuantity])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSizeId = e.target.value;
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
        const size = sizes.find((size: Size) => size.id.toString() === selectedSizeId);
        return size || null;
    }, [sizes, selectedSizeId]);

    let selectedPrice = useMemo(() => {
        if (!Array.isArray(variant)) return [];
        const selectedVariant = variant.find((variant: any) => variant.color === selectedColor);
        return selectedVariant ? selectedVariant.price : [];
    }, [selectedColor, variant ]);

    return (
        <div className="flex flex-col mt-[100px] w-full items-center">
                <div className="w-[300px]">
                <label className="flex border-black border p-4 bg-white items-center text-md rounded"> Selecione o tamanho:
                    <select onChange={handleChange} value={selectedSizeId} className="ml-auto border-black border text-center w-[50px]">
                        {sizes.map((size: Size) => (
                            <option key={size.id} value={size.id}>
                                {size.size}
                            </option>
                        ))}
                    </select>
                </label>
                </div>
                <div className="w-[300px]">
                        <label className="flex border-black border p-4 bg-white items-center text-md rounded">Quantidade:
                        <select onChange={handleQuantityChange} value={quantityValue} className="ml-auto border-black border text-center w-[50px]">
                            <option value={0}>{0}</option>
                            {[...Array(availableQuantity)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                        </label>
                    {availableQuantity === 0 && selectedSize && (
                        <h2>Estoque indisponível</h2>
                    )}
                </div>
                <div className="flex w-[300px]  border-black border p-4 bg-white items-center text-md rounded">
                {selectedPrice !== null ? (
                    <h1 className="text-3xl text-center w-full font-bold">R$ {selectedPrice * quantityValue}</h1>
                ) : (
                    <h1 className="">Selecione um tamanho para ver o preço</h1>
                )}
                </div>
        </div>

    );
}
