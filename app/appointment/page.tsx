import type { Metadata } from "next";
import AppointmentClient from "@/components/AppointmentClient";

export const metadata: Metadata = {
  title: "Book an Appointment: Clear Vision",
  description:
    "Book a comprehensive eye examination with Clear Vision's optometrists in Dehiwala, Sri Lanka.",
};

export default function AppointmentPage() {
  return <AppointmentClient />;
}
