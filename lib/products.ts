import content from "@/content";
import { getNotionProducts } from "@/lib/notion";

export type Product = {
  id: string;
  name: string;
  category: string;
  brand?: string;
  price: string;
  badge?: string;
  description: string;
  details: string;
  colors?: string[];
  /** Resolved photo URLs from Notion, in upload order. Falls back to the
   *  /public/images/{id}-*.jpg convention when this is absent. */
  images?: string[];
};

export async function getProducts(): Promise<Product[]> {
  const notionProducts = await getNotionProducts();
  if (notionProducts && notionProducts.length > 0) return notionProducts;

  // Falls back to the seed data in content.ts — keeps the site fully
  // functional even before Notion is connected, or if the API call fails.
  return content.shop.sampleProducts;
}
