import type { ReactNode } from "react";

import { AdminNav, useAdminNavDirection } from "./AdminNav";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({
  title,
  heading,
  intro,
  children,
  padding = "default",
  adminNav = false,
}: {
  title?: string;
  heading?: ReactNode;
  intro: string;
  children?: ReactNode;
  padding?: "default" | "faq";
  adminNav?: boolean;
}) {
  const mainPadding = padding === "faq" ? "py-14 lg:py-[85px]" : "py-20 lg:py-28";
  const adminNavDirection = useAdminNavDirection();
  const verticalAdminNav = adminNav && adminNavDirection === "vertical";
  const body = (
    <>
      {heading ?? <h1 className="text-3xl font-bold text-navy-blue lg:text-5xl">{title}</h1>}
      <p className="mt-6 max-w-[680px] text-lg text-navy-blue-sat50 lg:text-xl">{intro}</p>
      {children}
    </>
  );
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-cabin">
      <Header />
      <main className={`mx-auto w-full max-w-[1200px] flex-1 px-5 ${mainPadding}`}>
        {verticalAdminNav ? (
          <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-start">
            <AdminNav className="mb-0" />
            <div className="min-w-0 flex-1">{body}</div>
          </div>
        ) : (
          <>
            {adminNav ? <AdminNav /> : null}
            {body}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
