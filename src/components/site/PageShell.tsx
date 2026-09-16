import type { ReactNode } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-cabin">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-20 lg:py-28">
        <h1 className="text-3xl font-bold text-navy-blue lg:text-5xl">{title}</h1>
        <p className="mt-6 max-w-[680px] text-lg text-navy-blue-sat50 lg:text-xl">{intro}</p>
        {children}
      </main>
      <Footer />
    </div>
  );
}
