// Fetches the product catalog from the "Clear Vision — Products" Notion
// database. Requires NOTION_API_KEY and NOTION_PRODUCTS_DATABASE_ID env vars.
// Returns null (not an empty array) when Notion isn't configured or the
// request fails, so callers can fall back to the seed data in content.ts
// instead of showing an empty shop.

export type NotionProduct = {
  id: string;
  name: string;
  category: string;
  brand?: string;
  price: string;
  badge?: string;
  description: string;
  details: string;
  colors?: string[];
  /** Resolved, ready-to-use URLs from the "Photos" field, sorted by
   *  filename (e.g. pr1-1.jpg, pr1-2.jpg, ...) so the naming system
   *  controls order regardless of upload order. */
  images?: string[];
};

type NotionRichText = { plain_text: string }[];
type NotionFile = { name?: string; file?: { url: string }; external?: { url: string } };
type NotionPage = {
  id: string;
  properties: Record<
    string,
    {
      title?: NotionRichText;
      rich_text?: NotionRichText;
      select?: { name: string } | null;
      multi_select?: { name: string }[];
      number?: number | null;
      checkbox?: boolean;
      files?: NotionFile[];
    }
  >;
};

function text(prop?: { rich_text?: NotionRichText; title?: NotionRichText }): string {
  return prop?.rich_text?.[0]?.plain_text ?? prop?.title?.[0]?.plain_text ?? "";
}

// Numeric-aware sort so "pr1-2.jpg" sorts before "pr1-10.jpg" (a plain
// alphabetical sort would put "pr1-10" before "pr1-2"). This is what makes
// the filename naming system (pr1-1, pr1-2, pr1-3...) reliably control
// which photo shows first, regardless of the order they were uploaded in.
function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

export async function getNotionProducts(): Promise<NotionProduct[] | null> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_PRODUCTS_DATABASE_ID;

  if (!apiKey || !databaseId) return null;

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { property: "Published", checkbox: { equals: true } },
      }),
      // Re-check Notion at most once a minute. This also matters for the
      // "Photos" field: Notion's uploaded-file URLs are signed and expire
      // after about an hour, so keeping this well under that window means
      // pages always render with a fresh, working image URL.
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Notion products fetch failed:", res.status, await res.text());
      return null;
    }

    const data: { results: NotionPage[] } = await res.json();

    return data.results.map((page) => {
      const p = page.properties;
      const badge = p["Badge"]?.select?.name;
      const priceNum = p["Price (LKR)"]?.number ?? 0;
      const images = [...(p["Photos"]?.files ?? [])]
        .sort((a, b) => naturalCompare(a.name ?? "", b.name ?? ""))
        .map((f) => f.file?.url ?? f.external?.url)
        .filter((url): url is string => Boolean(url));

      return {
        id: text(p["Product ID"]) || page.id,
        name: text(p["Name"]) || "Untitled",
        category: p["Category"]?.select?.name ?? "",
        brand: p["Brand"]?.select?.name,
        price: `Rs ${priceNum.toLocaleString()}`,
        badge: badge && badge !== "None" ? badge : undefined,
        description: text(p["Description"]),
        details: text(p["Details"]),
        colors: p["Colors"]?.multi_select?.map((c) => c.name) ?? [],
        images: images.length > 0 ? images : undefined,
      };
    });
  } catch (err) {
    console.error("Notion products fetch threw:", err);
    return null;
  }
}
