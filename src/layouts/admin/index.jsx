"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AdminNavbar from "@/components/admin/navbar";

export default function LayoutAdmin({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user?.role !== "admin") {
      router.push("/admin/sign-in");
    }
  }, [session, router]);

  const noNavPaths = ["/admin/sign-in", "/404"];

  // const isAdminRoute = pathname.includes('/admin');
  const isAuthRoute = noNavPaths.includes(pathname);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <div className="p-5">{children}</div>
    </div>
  );
}
