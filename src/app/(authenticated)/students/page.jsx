"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Pagination from "./pagination";

const PaginationComponent = ({ searchParams }) => {
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

  const handleLimitChange = (event) => {
    setCurrentPage(1);
    router.push(`/students?page=1&limit=${event.target.value}`);
    setLimit(event.target.value);
  };
  const handlePageChange = (pageNumber) => {
    router.push(`/students?page=${pageNumber}&limit=${limit}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <form className="flex items-center space-x-3 my-3">
        <label htmlFor="limit">Limit:</label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="select select-sm"
        >
          {[5, 10, 20, 50].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Birthdate</th>
            <th>Sex</th>
            <th>Address</th>
            <th>City</th>
            <th>Province</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.birthdate}</td>
              <td>{item.sex}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
              <td>{item.province}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationComponent;
