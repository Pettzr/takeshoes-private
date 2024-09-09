import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface Variant {
  color: string;
  images: string[];
}

interface ImageVariantProps {
  variant?: Variant[]; // Tornar opcional para evitar erros
  selectedColor: string;
}

export default function SelectedColor({ variant = [], selectedColor }: ImageVariantProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [permanentImage, setPermanentImage] = useState<string | null>(null);

  useEffect(() => {
    if (variant.length > 0) {
      const selectedVariant = variant.find(variant => variant.color === selectedColor);
      if (selectedVariant) {
        setPermanentImage(selectedVariant.images[0]);
        setSelectedImage(selectedVariant.images[0]);
      } else {
        setPermanentImage(null);
        setSelectedImage(null);
      }
    }
  }, [selectedColor, variant]);

  const handleHover = (url: string) => {
    setSelectedImage(url);
  };

  const handleMouseLeave = () => {
    setSelectedImage(permanentImage);
  };

  const handleClick = (url: string) => {
    setPermanentImage(url);
    setSelectedImage(url);
  };

  // Verifica novamente se `variants` existe e não está vazio antes de usar o `find`
  const selectedVariant = variant.length > 0 ? variant.find(variant => variant.color === selectedColor) : null;

  return (
    <>
      {selectedVariant && (
        <div className="bor">
          <div className="flex p-4 gap-2 justify-center">
            <div className="relative w-[500px] h-[500px]">
              <Image
                className="border-[1px] border-4"
                src={selectedImage || selectedVariant.images[0]}
                layout="fill"
                alt={`Frente da camisa ${selectedVariant.color}`}
              />
            </div>
          </div>
          <div className="flex row mt-[50px] gap-8 justify-start">
          {selectedVariant.images.map(image => (
            <div
              key={image}
              className={clsx(
                "relative w-[100px] h-[100px] cursor-pointer",
                permanentImage === image && "border border-black"
              )}
              onMouseEnter={() => handleHover(image)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(image)}
            >
                <Image
                src={image}
                layout="fill"
                alt={`Frente da camisa ${selectedVariant.color}`}
                />
            </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
