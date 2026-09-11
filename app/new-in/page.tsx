import type { Metadata } from "next";
import NewInClient from "@/components/NewInClient";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "New In: Clear Vision",
  description: "The latest frames and sunglasses at Clear Vision, plus the brands we carry.",
};

export default async function NewInPage() {
  const products = await getProducts();
  return <NewInClient products={products} />;
}
