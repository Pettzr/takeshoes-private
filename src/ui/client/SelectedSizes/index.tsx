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
        <div className="flex mt-[100px] w-full">
            <div>
                <label className="flex border-black border  p-4 bg-white items-center text-md rounded"> Selecione o tamanho:
                    <select onChange={handleChange} value={selectedSizeId} className="ml-[30px] border-black border text-center">
                        {sizes.map((size: Size) => (
                            <option key={size.id} value={size.id}>
                                {size.size}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="ml-[40px] p-4 bg-white rounded border-black border">
                <div className="flex text-center items-center">
                    <h4 className="text-md mr-[10px]">Quantidade:</h4>
                    <select onChange={handleQuantityChange} value={quantityValue} className="border-black border-2 w-[50px]">
                        <option value={0}>{0}</option>
                        {[...Array(availableQuantity)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
                {availableQuantity === 0 && selectedSize && (
                    <h2>Estoque indisponível</h2>
                )}
            </div>
            <div className="flex p-4 text-center items-center bg-white ml-auto mr-1/10 w-[200px] rounded border-black border">
                {selectedPrice !== null ? (
                    <h1 className="w-full mr-[10px] text-xl">R$ {selectedPrice * quantityValue}</h1>
                ) : (
                    <h1 className="">Selecione um tamanho para ver o preço</h1>
                )}
            </div>
        </div>
    );
}
