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
  const notionProducts = (await getNotionProducts()) ?? [];

  // Merge: real Notion products first, then any sample product whose id
  // isn't already covered by Notion. This means adding a real product in
  // Notion never breaks a page that was already linked or cached for one
  // of the built-in samples — it only gets replaced once a Notion product
  // uses that exact same id, or once you remove it from content.ts yourself.
  const notionIds = new Set(notionProducts.map((p) => p.id));
  const remainingSamples = content.shop.sampleProducts.filter((p) => !notionIds.has(p.id));

  return [...notionProducts, ...remainingSamples];
}
