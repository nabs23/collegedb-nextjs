export default function Pagination({ page, totalPages, handlePageChange }: { page: number, totalPages: number, handlePageChange: (pageNumber: number) => void }) {
  // Generate page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="flex justify-between my-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <div>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`px-3 py-1 mx-1 ${
              page === number ? "bg-blue-700 text-white" : "bg-blue-200"
            } rounded hover:bg-blue-500`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
