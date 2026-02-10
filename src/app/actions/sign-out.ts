"use server";

import { signOut } from "@/authConfig";

export const handleSignOut = async () => {
  await signOut({ redirectTo: "/" });
};
