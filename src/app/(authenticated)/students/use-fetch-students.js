'use client'
import { useEffect, useState } from "react";

export default function useFetchStudents(page, limit) {
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setLoading(true);
      const fetchItems = async () => {
        try {
          const response = await fetch(`/api/students?page=${page}&limit=${limit}`);
          const data = await response.json();
          setItems(data.students);
          setTotalPages(data.totalPages);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchItems();
    }, [page, limit]);
  
    return { items, totalPages, loading, error };
  }