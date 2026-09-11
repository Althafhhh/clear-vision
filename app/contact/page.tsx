import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us: Clear Vision",
  description:
    "Visit Clear Vision at 78/C Sri Saranankara Road, Kalubowila, Dehiwala. Call, WhatsApp, or send us a message.",
};

export default function ContactPage() {
  return <ContactClient />;
}
