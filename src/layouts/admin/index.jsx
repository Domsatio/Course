"use client";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import AdminNavbar from "@/components/admin/navbar";

export default function LayoutAdmin({ children }) {
  return (
    <div className="min-h-screen">
      <NextTopLoader showSpinner={false} height={4} />
      <AdminNavbar />
      <div className="p-5">{children}</div>
    </div>
  );
}
