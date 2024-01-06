"use client";
import React, { useState, useEffect } from "react";

const PaginationComponent = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 10; // Set items per page

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
  }, [currentPage]);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto">
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
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div>
          {pageNumbers.map(number => (
            <button
              key={number}
              className={`px-3 py-1 mx-1 ${currentPage === number ? 'bg-blue-700 text-white' : 'bg-blue-200'} rounded hover:bg-blue-500`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
