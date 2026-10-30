import { useSyncExternalStore } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeftRight, ArrowUpDown } from "lucide-react";

import { pageTitleAccentClass, pageTitleClass } from "./page-title";

const STORAGE_KEY = "bfw-admin-nav-direction";

export type AdminNavDirection = "horizontal" | "vertical";

const listeners = new Set<() => void>();

function readDirection(): AdminNavDirection {
  if (typeof window === "undefined") return "horizontal";
  return window.localStorage.getItem(STORAGE_KEY) === "vertical" ? "vertical" : "horizontal";
}

export function useAdminNavDirection(): AdminNavDirection {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    readDirection,
    () => "horizontal",
  );
}

function setAdminNavDirection(next: AdminNavDirection) {
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

const items = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/newsletters", label: "Newsletters" },
  { to: "/admin/tools", label: "Financial Tools" },
  { to: "/admin/kit", label: "Savings Reset Kit" },
] as const;

export function AdminNav({ className = "mb-8" }: { className?: string }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const current = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const direction = useAdminNavDirection();
  const vertical = direction === "vertical";
  const itemClass = `inline-flex min-h-11 items-center justify-center rounded-[80px] px-5 text-center text-sm font-bold transition ${
    vertical ? "w-full" : "w-auto"
  }`;

  return (
    <nav
      aria-label="Administration"
      className={`flex gap-2 ${vertical ? "w-full shrink-0 flex-col md:w-56" : "flex-row flex-wrap items-center"} ${className}`}
    >
      <div
        role="group"
        aria-label="Menu direction"
        className="inline-flex gap-1 self-start rounded-full bg-white p-1 shadow-big-shadow"
      >
        <button
          type="button"
          aria-pressed={direction === "horizontal"}
          aria-label="Show the menu across the top"
          onClick={() => setAdminNavDirection("horizontal")}
          className={`inline-flex size-9 items-center justify-center rounded-full transition ${
            direction === "horizontal" ? "bg-navy-blue text-white" : "text-navy-blue hover:bg-[#57ae83] hover:text-white"
          }`}
        >
          <ArrowLeftRight className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          aria-pressed={direction === "vertical"}
          aria-label="Show the menu down the left side"
          onClick={() => setAdminNavDirection("vertical")}
          className={`inline-flex size-9 items-center justify-center rounded-full transition ${
            direction === "vertical" ? "bg-navy-blue text-white" : "text-navy-blue hover:bg-[#57ae83] hover:text-white"
          }`}
        >
          <ArrowUpDown className="size-4" aria-hidden />
        </button>
      </div>
      {items.map((item) => {
        const active = current === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: true }}
            aria-current={active ? "page" : undefined}
            className={`${itemClass} ${
              active
                ? "bg-navy-blue text-white"
                : "bg-white text-navy-blue shadow-big-shadow hover:bg-[#57ae83] hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminPageTitle({
  accent,
  before = "Manage ",
  after = "",
}: {
  accent: string;
  before?: string;
  after?: string;
}) {
  return (
    <h1 className={pageTitleClass}>
      {before}
      <span className={pageTitleAccentClass}>{accent}</span>
      {after}
    </h1>
  );
}
