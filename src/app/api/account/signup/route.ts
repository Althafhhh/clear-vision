import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, marketingOptIn } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_ACCOUNTS_DATABASE_ID;

    // Not configured yet — don't fail the signup UX, just skip the write.
    // The site still shows a success state; nothing is persisted until
    // Notion is connected.
    if (!apiKey || !databaseId) {
      return NextResponse.json({ ok: true, persisted: false });
    }

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Email: { title: [{ text: { content: email } }] },
          "Marketing Opt-In": { checkbox: Boolean(marketingOptIn) },
          Status: { select: { name: "New" } },
        },
      }),
    });

    if (!res.ok) {
      console.error("Notion account create failed:", res.status, await res.text());
      // Still return ok to the user — a failed background write shouldn't
      // block someone from using the site.
      return NextResponse.json({ ok: true, persisted: false });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("Account signup threw:", err);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
