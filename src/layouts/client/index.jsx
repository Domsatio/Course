"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ComplexNavbar from "@/components/client/navbar";
import { useSession } from "next-auth/react";

export default function LayoutClient({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user?.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [session, router]);

  // Paths where the ComplexNavbar should be hidden
  const noNavPaths = ["/sign-in", "/register", "/admin", "/404"];

  // const isAdminRoute = pathname.includes('/admin');
  const isAuthRoute = noNavPaths.includes(pathname);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <ComplexNavbar />
      {children}
    </>
  );
}
