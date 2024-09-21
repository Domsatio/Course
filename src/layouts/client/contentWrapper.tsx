import React from "react";

export default function ContentWrapper({className, children}: {className?: string, children: React.ReactNode}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 lg:pt-24 bg-white lg:bg-[#f4f4f4]">
      <section className={`bg-white flex container flex-col justify-center flex-wrap rounded-3xl gap-10 pt-10 pb-32 px-5 lg:px-24 ${className}`}>
        {children}
      </section>
    </main>
  );
}
