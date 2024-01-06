'use client'
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const Pagination = ({ totalPages, onPageChange }: { totalPages: number; onPageChange: (page: number) => void }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  }

  return (
    <div className="flex justify-between my-4">
      <div className="join">
      <input
            className="join-item btn"
            type="radio"
            name="options"
            aria-label="Previous"
            onChange={() => handleOnPageChange(currentPage - 1)}
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
            onChange={() => handleOnPageChange(number)}
          />
        ))}
         <input
            className="join-item btn"
            type="radio"
            name="options"
            aria-label="Next"
            onChange={() => handleOnPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
      </div>
      
    </div>
  );
};

export default Pagination;