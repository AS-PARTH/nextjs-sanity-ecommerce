"use client";
import { useEffect, useState } from "react";

export default function MonthlyUsers() {
  const [users, setUsers] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => setUsers(Number(data.users)))
      .catch((err) => console.error("Error fetching analytics:", err));
  }, []);
console.log(users,"users");

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Monthly Active Users</h2>
      <p className="text-2xl font-bold">{users ?? "Loading..."}</p>
    </div>
  );
}
