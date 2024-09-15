import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; 
import clsx from 'clsx';

interface PaginationProps {
  totalProducts: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void; // Função para informar a mudança de página
}

function Pagination({ totalProducts, itemsPerPage, onPageChange }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const currentPage = Number(searchParams?.get('page')) || 1; 
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const maxVisiblePages = 3;

  useEffect(() => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    setVisiblePages(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
  }, [currentPage, totalPages, maxVisiblePages]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(page));
    router.push(`${window.location.pathname}?${params.toString()}`);
    onPageChange(page);
  };

  return (
    <div className="flex justify-center my-[50px]">
      <ul className="pagination flex gap-[10px] border border-black text-lg p-4 rounded-full">
        <li className={clsx('pagination-item', { disabled: currentPage === 1 })}>
          <button
            className="pagination-link p-1 hover:bg-gray-200 hover:rounded-full"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
        </li>
        {visiblePages.map((pageNumber) => (
          <li
            key={pageNumber}
            className={clsx('pagination-item px-2 flex items-center', {
              active: currentPage === pageNumber,
              'rounded-full border border-black': currentPage === pageNumber,
            })}
          >
            <button
              className="pagination-link"
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className={clsx('pagination-item', { disabled: currentPage === totalPages })}>
          <button
            className="pagination-link p-1 hover:bg-gray-200 hover:rounded-full"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
