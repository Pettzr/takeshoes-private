interface Variant {
    id: string;
    color: string;
    images: string[];
    price: number;
    sizes: SizeData;
  };
  

interface DataVariantsProps {
    variant?: Variant[];
    slug?: string;
}

interface DataVariant {
    data: Variant[];
    slug: Variant.slug;
  }
  
  interface SelectVariant {
    variants: Variant[];
    handleSelect: (value: string) => void;
    showCreateOption?: boolean;
    selectedVariant?: string;
  }
  
  interface SelectedVariant {
    variant?: Variant[];
    slug: string;
    color?: string;
    product?: Product[];
    onUploadSuccess?: (images: string[]) => void;
  };

  interface ImageVariantProps {
    variants: Variant[];
    variant: Variant;
    selectedColor: string; 
  }
  
  interface SizeVariantProps {
    selectedColor: string;
    sizes?: Size[];
  }
  
  