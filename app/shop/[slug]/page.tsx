import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProducts } from "@/lib/products";

// New products added in Notion (a slug not in this build-time list) still
// render on first visit — Next.js falls back to server rendering for any
// slug not returned here, since dynamicParams defaults to true.
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === slug);
  if (!product) return { title: "Product Not Found: Clear Vision" };
  return {
    title: `${product.name}: Clear Vision`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} allProducts={products} />;
}
