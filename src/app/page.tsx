"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LogIn, Shield, Zap, Globe, Lock } from "lucide-react";
import { signInWithHealthId } from "./actions/sign-in";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        {/* Floating Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-badge">
            <Shield size={14} />
            ระบบยืนยันตัวตน Health ID
          </div>

          <h1 className="hero-title">
            เข้าสู่ระบบด้วย
            <br />
            <span className="gradient-text">Provider ID OAuth</span>
          </h1>

          <p className="hero-subtitle">
            ระบบยืนยันตัวตนผ่าน Health ID (moph.id.th) เชื่อมต่อกับ Provider ID
            อย่างปลอดภัย พร้อมการจัดการ session ด้วย Auth.js
          </p>

          <div className="hero-actions">
            <form action={signInWithHealthId}>
              <input type="hidden" name="redirectTo" value="/dashboard" />
              <button type="submit" className="btn-primary" id="login-button">
                <LogIn size={20} />
                เข้าสู่ระบบ
              </button>
            </form>

            <Link href="/about" className="btn-ghost">
              <Globe size={18} />
              เรียนรู้เพิ่มเติม
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "0 2rem 6rem", maxWidth: "72rem", margin: "0 auto" }}>
        <div className="features-grid">
          <div className="glass-card feature-card">
            <div className="feature-icon purple">
              <Shield size={22} />
            </div>
            <h3>ปลอดภัยสูง</h3>
            <p>
              ใช้ OAuth 2.0 Authorization Code Flow ผ่าน Health ID
              ไม่เก็บรหัสผ่านในระบบ
            </p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon green">
              <Zap size={22} />
            </div>
            <h3>เร็วทันใจ</h3>
            <p>
              JWT Strategy สำหรับ session management ไม่ต้อง query database
              ทุกครั้ง
            </p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon rose">
              <Lock size={22} />
            </div>
            <h3>Route Protection</h3>
            <p>
              ป้องกันหน้าที่ต้อง login ด้วย Proxy (middleware) ก่อน render
              หน้าเว็บ
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
