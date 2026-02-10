import {
  Globe,
  Shield,
  ArrowRight,
  Key,
  Server,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  const steps = [
    {
      icon: <Key size={22} />,
      title: "1. ผู้ใช้กดเข้าสู่ระบบ",
      description: "ระบบ redirect ไปยัง moph.id.th เพื่อยืนยันตัวตนผ่าน Health ID",
      color: "purple",
    },
    {
      icon: <Server size={22} />,
      title: "2. Exchange Token",
      description:
        "นำ authorization code ไปแลก access token จาก Health ID แล้วต่อไปยัง Provider ID",
      color: "green",
    },
    {
      icon: <UserCheck size={22} />,
      title: "3. ดึง Profile & สร้าง Session",
      description:
        "ใช้ Provider ID token ดึงข้อมูล profile แล้วสร้าง JWT session ด้วย Auth.js",
      color: "rose",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-inner">
          {/* Header */}
          <div className="page-header">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <h1 className="page-title">เกี่ยวกับระบบ</h1>
              <span className="status-badge public">
                <span className="dot-pulse green" />
                Public
              </span>
            </div>
            <p className="page-description">
              หน้านี้เป็น public — ทุกคนสามารถเข้าถึงได้โดยไม่ต้องเข้าสู่ระบบ
            </p>
          </div>

          {/* Architecture Overview */}
          <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div className="feature-icon purple">
                <Shield size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  สถาปัตยกรรมระบบ Auth
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  OAuth 2.0 Authorization Code Flow
                </p>
              </div>
            </div>

            <div
              style={{
                background: "rgba(0,0,0,0.25)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                fontFamily: "monospace",
                fontSize: "0.82rem",
                lineHeight: "1.8",
                overflowX: "auto",
                color: "var(--muted)",
              }}
            >
              <pre style={{ margin: 0 }}>
{`┌────────────────┐       ┌─────────────────┐       ┌──────────────────┐
│  Login Button  │──①──▶│  moph.id.th     │──②──▶│  /api/auth/      │
│  (Server       │       │  OAuth Redirect  │       │  healthid        │
│   Action)      │       │                  │◀──②──│  (Callback)      │
└────────────────┘       └─────────────────┘       └──────┬───────────┘
                                                          │③
                                                   ┌──────▼───────────┐
                                                   │  provider.id.th  │
                                                   │  Token + Profile │
                                                   └──────┬───────────┘
                                                          │④
                                                   ┌──────▼───────────┐
                                                   │  Auth.js signIn  │
                                                   │  → JWT Session   │
                                                   └──────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Steps */}
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
            ขั้นตอนการทำงาน
          </h2>

          <div className="features-grid" style={{ marginBottom: "2rem" }}>
            {steps.map((step) => (
              <div className="glass-card feature-card" key={step.title}>
                <div className={`feature-icon ${step.color}`}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1rem" }}>
              เทคโนโลยีที่ใช้
            </h2>
            <div className="profile-grid">
              {[
                { label: "Framework", value: "Next.js 16 (App Router)" },
                { label: "Authentication", value: "Auth.js v5 (next-auth)" },
                { label: "Strategy", value: "JWT + Credentials Provider" },
                { label: "OAuth Provider", value: "Health ID (moph.id.th)" },
                { label: "Profile API", value: "Provider ID (provider.id.th)" },
                { label: "Route Protection", value: "Proxy (proxy.ts)" },
              ].map((tech) => (
                <div className="profile-item" key={tech.label}>
                  <div className="profile-label">{tech.label}</div>
                  <div className="profile-value">{tech.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Routes Info */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1rem" }}>
              เพจในระบบ
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  background: "var(--surface)",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--card-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Globe size={18} style={{ color: "var(--accent)" }} />
                  <div>
                    <div style={{ fontWeight: 500 }}>หน้าหลัก</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>/ — Landing page + ปุ่มเข้าสู่ระบบ</div>
                  </div>
                </div>
                <span className="status-badge public">
                  <span className="dot-pulse green" />
                  Public
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  background: "var(--surface)",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--card-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Globe size={18} style={{ color: "var(--accent)" }} />
                  <div>
                    <div style={{ fontWeight: 500 }}>เกี่ยวกับ</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>/about — ข้อมูลระบบ</div>
                  </div>
                </div>
                <span className="status-badge public">
                  <span className="dot-pulse green" />
                  Public
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  background: "var(--surface)",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--card-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Shield size={18} style={{ color: "var(--danger)" }} />
                  <div>
                    <div style={{ fontWeight: 500 }}>แดชบอร์ด</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>/dashboard — ต้องเข้าสู่ระบบ</div>
                  </div>
                </div>
                <span className="status-badge protected">
                  <span className="dot-pulse red" />
                  Protected
                </span>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <Link href="/dashboard" className="btn-ghost">
                ไปที่แดชบอร์ด
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
