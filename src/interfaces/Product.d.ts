interface Product {
    id?: string;
    name?: string;
    slug?: string;
    error?: string;
    variant?: Variant[];
};

interface ImageData {
  url: string;
}

interface DataProduct {
  data: Product[];
  slug?: Product.slug;
}



