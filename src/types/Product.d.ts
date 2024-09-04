type Product = {
    id?: string;
    name?: string;
    slug?: string;
    variant?: Variant[];
};

type Variant = {
  id: string;
  color: string;
  images: string;
  price: number;
  sizes: SizeData;
};

type Size = string;

type Sizes = {
  [key in Size]: SizeState;
}

type SizeInputProps = {
  sizes: {
    [key in Size]: SizeState };
  onSizeChange: (size: Size, field: keyof SizeState, value: number ) => void,
}

type SizeData = {
  id?: number;
  size: string;
  quantity: number;
};

type ImageData = {
  url: string;
}

type DataProduct = {
  data: Product[];
  slug?: Product.slug;
}

type DataVariant = {
  data: Variant[];
  slug: Variant.slug;
}

type SelectVariant = {
  variants: Variant[];
  handleSelect: (value: string) => void;
  showCreateOption?: boolean;
  selectedVariant?: string;
}

type SelectedVariant = {
  variant?: Variant[];
  slug: string;
  color?: string;
  product?: Product[];
  onUploadSuccess?: (images: string[]) => void;
};

type ImageVariantProps = {
  variants: Variant[];
  selectedColor: string; 
}

type SizeVariantProps =  {
  selectedColor: string;
  sizes?: Size[];
}

