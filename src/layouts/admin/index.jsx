"use client";
import React from "react";
import AdminNavbar from "@/components/admin/navbar";

export default function LayoutAdmin({ children }) {
  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <div className="p-5">{children}</div>
    </div>
  );
}
