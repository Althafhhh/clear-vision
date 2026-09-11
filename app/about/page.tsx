import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Us: Clear Vision",
  description:
    "Clear Vision's mission is to provide the perfect eyewear from an exquisite collection of frames and lenses, at affordable rates, in a friendly atmosphere.",
};

export default function AboutPage() {
  return <AboutClient />;
}
