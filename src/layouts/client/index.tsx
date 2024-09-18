"use client";
import React from "react";
import { useRouter } from "next/router";
import ComplexNavbar from "@/components/client/Navbar";
import { Footer } from "@/components/client/Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

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
