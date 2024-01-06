"use client";
import { useEffect, useState } from "react";

export default function Students() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/students");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  });
  return (
    <section>
      <h1 className="text-3xl">Students</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((student) => (
            <tr key={student._id}>
              <td>{student.firstName}</td>
              <td>{student.email}</td>
              <td>{student.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
