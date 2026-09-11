import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Clear Vision: Family Eye Care, Dehiwala, Sri Lanka",
  description:
    "Comprehensive eye examinations, prescriptions, and affordable eyewear: frames, lenses, sunglasses, and designer brands. Glasses ready in as little as 2 hours.",
};

export default async function HomePage() {
  const products = await getProducts();
  return <HomeClient products={products} />;
}
