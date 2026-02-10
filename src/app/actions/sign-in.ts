"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const signInWithHealthId = async (formData: FormData) => {
  const redirectTo = (formData.get("redirectTo") as string) || "/dashboard";

  // เก็บข้อมูลลง cookie เพื่อใช้หลัง OAuth redirect กลับมา
  const cookieStore = await cookies();
  cookieStore.set("redirectTo", redirectTo, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  // Redirect ไปยัง moph.id.th OAuth page
  const clientId = process.env.HEALTH_CLIENT_ID;
  const redirectUri = process.env.HEALTH_REDIRECT_URI;
  const url = `https://moph.id.th/oauth/redirect?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  redirect(url);
};
