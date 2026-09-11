import type { Metadata } from "next";
import AccountLoginClient from "@/components/AccountLoginClient";

export const metadata: Metadata = {
  title: "Sign In: Clear Vision",
  description: "Sign in or create a Clear Vision account.",
};

export default function AccountLoginPage() {
  return <AccountLoginClient />;
}
