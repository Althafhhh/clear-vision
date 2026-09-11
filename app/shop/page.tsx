import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Eyewear: Clear Vision",
  description:
    "Browse Clear Vision's eyewear categories: sunglasses, designer frames, men's, women's, kids', and sports eyewear.",
};

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <Suspense fallback={null}>
      <ShopClient products={products} />
    </Suspense>
  );
}
