interface SizeState {
  quantity: number;
  price: number;
  available: boolean;
}

interface SizeData {
    id: number;
    size: string;
    quantity: number;
    price: number;
  }
  

interface SizeInputProps {
    sizes: {
        [key: string]: SizeState;
    };
    onSizeChange: (size: string, field: keyof SizeState, value: number) => void;
}

interface SelectedSizesProps {
  selectedColor: string;
  variant: any[];
  handleSizeSelect: (value: string) => void;
  handleQuantitySelect: (value: number) => void;
}

