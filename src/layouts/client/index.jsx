"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ComplexNavbar from "@/components/client/navbar";
import { useSession } from "next-auth/react";

export default function LayoutClient({ children }) {
  const { pathname, push } = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user?.role === "ADMIN") {
      push("/admin/dashboard");
    }
  }, [session, push]);

  // Paths where the ComplexNavbar should be hidden
  const noNavPaths = ["/sign-in", "/register", "/404"];

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
