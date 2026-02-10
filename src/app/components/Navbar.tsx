"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Shield, LogOut } from "lucide-react";
import { handleSignOut } from "../actions/sign-out";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { href: "/", label: "หน้าหลัก" },
    { href: "/about", label: "เกี่ยวกับ" },
    { href: "/dashboard", label: "แดชบอร์ด" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="nav-logo">
          <Shield size={22} style={{ color: "var(--primary-hover)" }} />
          <span>ProviderAuth</span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          {session ? (
            <form action={handleSignOut}>
              <button type="submit" className="btn-danger" style={{ marginLeft: "0.5rem" }}>
                <LogOut size={16} />
                ออกจากระบบ
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
