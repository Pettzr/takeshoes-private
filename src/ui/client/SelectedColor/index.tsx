import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function SelectedColor({ variants = [], selectedColor }: ImageVariantProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [permanentImage, setPermanentImage] = useState<string | null>(null);

  useEffect(() => {
    if (variants.length > 0) {
      const selectedVariant = variants.find(variant => variant.color === selectedColor);
      if (selectedVariant) {
        setPermanentImage(selectedVariant.images[0]);
        setSelectedImage(selectedVariant.images[0]);
      } else {
        setPermanentImage(null);
        setSelectedImage(null);
      }
    }
  }, [selectedColor, variants]);

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

  const selectedVariant = variants.length > 0 ? variants.find(variant => variant.color === selectedColor) : null;

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
