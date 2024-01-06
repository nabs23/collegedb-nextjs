'use client'
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import Pagination from "./pagination";
import useFetchStudents from "./use-fetch-students.js";

const Students = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 10);

  const { items, totalPages, loading, error } = useFetchStudents(currentPage, limit);

  const handleLimitChange = useCallback(
    (event) => {
      const newLimit = event.target.value;
      router.push(`/students?page=1&limit=${newLimit}`);
      setLimit(newLimit);
      setCurrentPage(1);
    },
    [router]
  );

  const handlePageChange = useCallback(
    (pageNumber) => {
      router.push(`/students?page=${pageNumber}&limit=${limit}`);
      setCurrentPage(pageNumber);
    },
    [router, limit]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      {/* Form for limit */}
      <form>
        <label htmlFor="limit">Limit:&nbsp;</label>
        <select id="limit" value={limit} onChange={handleLimitChange} className="select select-sm my-4">
          {[5, 10, 20, 50].map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </form>
      {/* Students List */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <div key={index} className="border p-4">
            {item.fullName}
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default Students;
