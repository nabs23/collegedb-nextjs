'use client'
import { useMemo } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }: { totalPages: number; currentPage: number; onPageChange: (page: number) => void }) => {

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  return (
    <div className="flex justify-between my-4">
      <div className="join">
      <input
            className="join-item btn"
            type="radio"
            name="options"
            aria-label="Previous"
            onChange={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        {pageNumbers.map((number) => (
          <input
            key={number}
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label={number.toString()}
            checked={currentPage === number}
            onChange={() => onPageChange(number)}
          />
        ))}
         <input
            className="join-item btn"
            type="radio"
            name="options"
            aria-label="Next"
            onChange={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
      </div>
      
    </div>
  );
};

export default Pagination;