"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const PaginationComponent = ({ searchParams }) => {
  console.log(searchParams);
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(searchParams.page || 1);
  const [limit, setLimit] = useState(searchParams.limit || 10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Fetch items when component mounts or currentPage changes
    const fetchItems = async () => {
      const response = await fetch(
        `/api/students?page=${currentPage}&limit=${limit}`
      );
      const data = await response.json();
      setItems(data.students);
      setTotalPages(data.totalPages);
    };
    fetchItems();
  }, [currentPage, limit]);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleLimitChange = (event) => {
    router.push(`/students?page=${currentPage}&limit=${event.target.value}`);
    setLimit(event.target.value);
  };
  const handlePageChange = (pageNumber) => {
    router.push(`/students?page=${pageNumber}&limit=${limit}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <form>
        <label htmlFor="limit">Limit:</label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </form>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <div key={index} className="border p-4">
            {/* Render your item data here */}
            {item.fullName}
            {/* Include other item fields as needed */}
          </div>
        ))}
      </div>

      <div className="flex justify-between my-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-3 py-1 mx-1 ${
                currentPage === number
                  ? "bg-blue-700 text-white"
                  : "bg-blue-200"
              } rounded hover:bg-blue-500`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
