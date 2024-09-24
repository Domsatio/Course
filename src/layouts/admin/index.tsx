import React from "react";
import NextTopLoader from "nextjs-toploader";
import AdminNavbar from "@/components/admin/Navbar";
import 'react-quill/dist/quill.snow.css';

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <NextTopLoader showSpinner={false} height={4} />
      <AdminNavbar>
        {children}
      </AdminNavbar>
    </div>
  );
}
