import NextAuth, { type NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 25, // 25 ชั่วโมง
  },
  pages: {
    signIn: "/", // ใช้ Landing page เป็นหน้า sign-in
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // รองรับ login จาก Health ID (OAuth callback)
        if (credentials["cred-way"] === "health-id") {
          return {
            name: (credentials.username as string) || "health-id",
            profile: credentials.profile!,
          };
        }

        // รองรับ login แบบ username/password (ถ้าต้องการ)
        if (credentials["cred-way"] === "user-pass") {
          // TODO: ตรวจสอบ username/password กับฐานข้อมูล
          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // เก็บ profile ลง JWT token ตอน login ครั้งแรก
        token.profile = (user as any).profile;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token && session.user) {
        // ส่ง profile ไปให้ client ผ่าน session
        (session.user as any).profile = (token as any).profile;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
