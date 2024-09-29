import React from "react";
import { cn } from "@/libs/cn";

export default function ContentWrapper({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center py-20 lg:py-24 bg-white lg:bg-[#f4f4f4] overflow-hidden">
      <section className={cn('bg-white flex flex-col flex-wrap justify-start container rounded-3xl gap-10 p-10 2xl:max-w-[75rem]', className)}>
        {children}
      </section>
    </main>
  );
}

// lg:bg-[#f4f4f4]
