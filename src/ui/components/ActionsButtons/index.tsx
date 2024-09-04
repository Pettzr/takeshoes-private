import React from 'react';

interface ActionButtonsProps {
  handleSaveImages: () => void;
  handleDeleteVariant: () => void;
}

export default function ActionButtons({
  handleSaveImages,
  handleDeleteVariant,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        className="bg-black text-white p-2 rounded w-[150px]"
        onClick={handleSaveImages}
      >
        Salvar Imagens
      </button>
      <button
        className="bg-red-500 text-white p-2 rounded w-[150px]"
        onClick={handleDeleteVariant}
      >
        Deletar Cor
      </button>
    </div>
  );
}
