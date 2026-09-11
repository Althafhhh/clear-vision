// Fetches editable page copy from the per-page Notion databases under
// "Clear Vision — Website Backend" (Home, About, Contact, Appointment,
// Shop/New In/Collections, Wishlist). Each database uses the same shape
// (Key, Value, Text Color), so they're queried in parallel and merged into
// one flat key -> { value, color } map. Returns null when none are
// configured; returns whatever it could fetch if only some are.

export type CopyField = { value: string; color?: string };

const COLOR_MAP: Record<string, string> = {
  White: "#FFFFFF",
  "Muted Gray": "#9C8D7E",
  "Accent Green": "#2E7D4F",
  "Alert Red": "#B3261E",
  // "Default (Brand Brown)" and anything unrecognized falls through to
  // undefined, which means "don't override, use the site's normal color".
};

type NotionRichText = { plain_text: string }[];
type NotionPage = {
  properties: {
    Key?: { rich_text?: NotionRichText };
    Value?: { rich_text?: NotionRichText };
    "Text Color"?: { select?: { name: string } | null };
  };
};

async function queryContentDatabase(
  apiKey: string,
  databaseId: string
): Promise<Record<string, CopyField>> {
  const map: Record<string, CopyField> = {};

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 100 }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Notion site content fetch failed:", databaseId, res.status, await res.text());
      return map;
    }

    const data: { results: NotionPage[] } = await res.json();

    for (const page of data.results) {
      const key = page.properties.Key?.rich_text?.[0]?.plain_text;
      const value = page.properties.Value?.rich_text?.[0]?.plain_text;
      if (!key || !value) continue;

      const colorName = page.properties["Text Color"]?.select?.name;
      map[key] = { value, color: colorName ? COLOR_MAP[colorName] : undefined };
    }
  } catch (err) {
    console.error("Notion site content fetch threw:", databaseId, err);
  }

  return map;
}

export async function getSiteContent(): Promise<Record<string, CopyField> | null> {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return null;

  const databaseIds = [
    process.env.NOTION_HOME_DATABASE_ID,
    process.env.NOTION_ABOUT_DATABASE_ID,
    process.env.NOTION_CONTACT_DATABASE_ID,
    process.env.NOTION_APPOINTMENT_DATABASE_ID,
    process.env.NOTION_SHOP_DATABASE_ID,
    process.env.NOTION_WISHLIST_DATABASE_ID,
  ].filter((id): id is string => Boolean(id));

  if (databaseIds.length === 0) return null;

  const results = await Promise.all(databaseIds.map((id) => queryContentDatabase(apiKey, id)));
  return Object.assign({}, ...results);
}
