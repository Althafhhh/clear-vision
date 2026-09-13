import type { Metadata } from "next";
import CollectionsClient from "@/components/CollectionsClient";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections: Clear Vision",
  description: "Browse Clear Vision's eyewear collections by category.",
};

export default async function CollectionsPage() {
  const products = await getProducts();
  return <CollectionsClient products={products} />;
}
