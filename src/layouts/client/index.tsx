"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ComplexNavbar from "@/components/client/Navbar";
import { useSession } from "next-auth/react";
import { Footer } from "@/components/client/Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { pathname, push } = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user?.role === "ADMIN") {
      push("/admin/dashboard");
    }
  }, [session, push]);

  const noNavPaths = ["/sign-in", "/register", "/404"];

  const isAuthRoute = noNavPaths.includes(pathname);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <ComplexNavbar />
      {children}
      <Footer />
    </>
  );
}
