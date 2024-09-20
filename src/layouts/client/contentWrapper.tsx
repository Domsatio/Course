import React from "react";

export default function ContentWrapper({children}: {children: React.ReactNode}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 lg:pt-24">
      <section className="flex container flex-col justify-center flex-wrap gap-10 pt-10 pb-32 px-5 lg:px-24">
        {children}
      </section>
    </main>
  );
}
