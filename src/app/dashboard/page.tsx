import { auth } from "@/authConfig";
import { redirect } from "next/navigation";
import {
  Shield,
  User,
  Building2,
  Hash,
  MapPin,
  Briefcase,
  Mail,
  CreditCard,
  BadgeCheck,
  Hospital,
  Calendar,
  Globe,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  let profile: any = {};
  try {
    profile = JSON.parse((session.user as any)?.profile || "{}");
  } catch {
    profile = {};
  }

  // ดึงข้อมูล organization แรก (ถ้ามี)
  const org = profile.organization?.[0] || {};
  const address = org.address || {};

  // สร้างชื่อแสดงผลจาก profile จริง
  const displayName =
    profile.firstname_th && profile.lastname_th
      ? `${profile.title_th || ""}${profile.firstname_th} ${profile.lastname_th}`
      : profile.name_th || session.user?.name || "ผู้ใช้งาน";

  const displayNameEn = profile.name_eng || "";

  const initials = profile.firstname_th && profile.lastname_th
    ? `${profile.firstname_th[0]}${profile.lastname_th[0]}`.toUpperCase()
    : displayName
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

  // ข้อมูลหลักจาก profile — ใช้ field จริงจาก Provider ID API
  const profileFields = [
    {
      label: "ชื่อ-นามสกุล (ไทย)",
      value: displayName,
      icon: <User size={16} />,
    },
    {
      label: "ชื่อ-นามสกุล (อังกฤษ)",
      value: displayNameEn || "-",
      icon: <Globe size={16} />,
    },
    {
      label: "Provider ID",
      value: profile.provider_id || "-",
      icon: <Hash size={16} />,
    },
    {
      label: "วันเกิด",
      value: profile.date_of_birth
        ? new Date(profile.date_of_birth).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "-",
      icon: <Calendar size={16} />,
    },
    {
      label: "อีเมล",
      value: profile.email || "-",
      icon: <Mail size={16} />,
    },
    {
      label: "Hash CID",
      value: profile.hash_cid
        ? `${profile.hash_cid.slice(0, 8)}...${profile.hash_cid.slice(-8)}`
        : "-",
      icon: <CreditCard size={16} />,
    },
  ];

  // ข้อมูลหน่วยงาน
  const orgFields = [
    {
      label: "ตำแหน่ง",
      value: org.position || "-",
      icon: <Briefcase size={16} />,
    },
    {
      label: "ประเภทตำแหน่ง",
      value: org.position_type || "-",
      icon: <BadgeCheck size={16} />,
    },
    {
      label: "หน่วยงาน / สถานพยาบาล",
      value: org.hname_th || "-",
      icon: <Hospital size={16} />,
    },
    {
      label: "หน่วยงาน (อังกฤษ)",
      value: org.hname_eng || "-",
      icon: <Building2 size={16} />,
    },
    {
      label: "รหัสหน่วยงาน (Hcode)",
      value: org.hcode || "-",
      icon: <Hash size={16} />,
    },
    {
      label: "รหัส 9 หลัก",
      value: org.code9 || "-",
      icon: <Shield size={16} />,
    },
    {
      label: "จังหวัด",
      value: address.province || "-",
      icon: <MapPin size={16} />,
    },
    {
      label: "อำเภอ / ตำบล",
      value: [address.district, address.sub_district].filter(Boolean).join(" / ") || "-",
      icon: <MapPin size={16} />,
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
              <h1 className="page-title">แดชบอร์ด</h1>
              <span className="status-badge protected">
                <span className="dot-pulse red" />
                Protected
              </span>
            </div>
            <p className="page-description">
              หน้านี้ต้องเข้าสู่ระบบก่อนจึงจะเข้าถึงได้ — ข้อมูล Profile จาก Provider ID
            </p>
          </div>

          {/* Profile Card */}
          <div className="glass-card profile-card" style={{ marginBottom: "1.5rem" }}>
            <div className="profile-header">
              <div className="profile-avatar">{initials}</div>
              <div>
                <div className="profile-name">{displayName}</div>
                <div className="profile-role">
                  {org.position || "บุคลากรสาธารณสุข"}
                </div>
                {org.hname_th && (
                  <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                    {org.hname_th}
                  </div>
                )}
              </div>
            </div>

            <h3 style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.75rem", marginTop: "1.5rem" }}>
              👤 ข้อมูลส่วนตัว
            </h3>
            <div className="profile-grid">
              {profileFields.map((field) => (
                <div className="profile-item" key={field.label}>
                  <div className="profile-label" style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    {field.icon}
                    {field.label}
                  </div>
                  <div className="profile-value">{field.value}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.75rem", marginTop: "1.5rem" }}>
              🏥 ข้อมูลหน่วยงาน
            </h3>
            <div className="profile-grid">
              {orgFields.map((field) => (
                <div className="profile-item" key={field.label}>
                  <div className="profile-label" style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    {field.icon}
                    {field.label}
                  </div>
                  <div className="profile-value">{field.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Debug */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.95rem" }}>
              🔐 Session Data (Debug)
            </h3>
            <pre
              style={{
                background: "rgba(0,0,0,0.3)",
                padding: "1rem",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
                overflowX: "auto",
                color: "var(--muted)",
                lineHeight: "1.6",
              }}
            >
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
