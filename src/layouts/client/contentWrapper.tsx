import React from "react";
import { cn } from "@/libs/cn";

export default function ContentWrapper({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen justify-center pt-20 lg:pt-24 bg-white lg:bg-[#f4f4f4] overflow-hidden">
      <section className={cn('bg-white flex flex-col flex-wrap justify-start container rounded-3xl gap-10 mb-5 pt-10 pb-32 px-4 lg:px-24', className)}>
        {children}
      </section>
    </main>
  );
}
