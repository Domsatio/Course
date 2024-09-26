import React from "react";
import { cn } from "@/libs/cn";

export default function ContentWrapper({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10 lg:py-24 bg-white lg:bg-[#f4f4f4] mt-10 lg:mt-0">
      <section className={cn('bg-white flex container flex-col justify-center flex-wrap rounded-3xl gap-10 mb-5 p-10 2xl:max-w-[75rem]', className)}>
        {children}
      </section>
    </main>
  );
}
