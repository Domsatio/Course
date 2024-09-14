"use client";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import AdminNavbar from "@/components/admin/navbar";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <NextTopLoader showSpinner={false} height={4} />
      <AdminNavbar children={children} />
    </div>
  );
}
