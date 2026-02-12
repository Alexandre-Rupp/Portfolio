"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Menu" },
  { href: "/developpement", label: "Développement" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/devops", label: "DevOps" },
  { href: "/contact", label: "Contact" }
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="dashboard-nav" aria-label="Navigation principale">
        <div className="dashboard-nav-links">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`dashboard-link${isActive ? " is-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="theme-floating">
        <ThemeToggle />
      </div>
    </>
  );
}
