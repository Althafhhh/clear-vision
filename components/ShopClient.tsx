"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import content from "@/content";
import ProductCard from "@/components/ProductCard";
import Copy from "@/components/Copy";
import type { Product } from "@/lib/products";

export default function ShopClient({ products }: { products: Product[] }) {
  const { shop, brands } = content;
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") ?? "All");
  const [brand, setBrand] = useState(() => {
    const param = searchParams.get("brand");
    if (!param) return "All";
    return brands.find((b) => b.slug === param)?.name ?? param;
  });
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");

  const categoryNames = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const brandNames = ["All", ...brands.map((b) => b.name)];

  const priceValue = (price: string) => Number(price.replace(/[^\d]/g, ""));

  const filtered = useMemo(() => {
    let items = products.filter((p) => {
      const categoryMatch = category === "All" || p.category === category;
      const brandMatch =
        brand === "All" ||
        p.brand === brand ||
        brands.find((b) => b.slug === brand)?.name === p.brand;
      return categoryMatch && brandMatch;
    });

    if (sort === "price-asc") items = [...items].sort((a, b) => priceValue(a.price) - priceValue(b.price));
    if (sort === "price-desc") items = [...items].sort((a, b) => priceValue(b.price) - priceValue(a.price));

    return items;
  }, [category, brand, sort, products, brands]);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Shop</span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
            <Copy path="shop.title" fallback={shop.title} />
          </h1>
          <p style={{ maxWidth: 520, marginTop: 10 }}>
            <Copy path="shop.subtitle" fallback={shop.subtitle} />
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Shop
          </div>
        </div>
      </section>

      {/* ---------- FILTERS ---------- */}
      <section style={{ padding: "32px 40px 0" }}>
        <div className="filter-row">
          <div className="filter-group">
            <span className="filter-label">Category</span>
            <div className="filter-pills">
              {categoryNames.map((c) => (
                <button
                  key={c}
                  className={`filter-pill ${category === c ? "active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Brand</span>
            <div className="filter-pills">
              {brandNames.map((b) => (
                <button
                  key={b}
                  className={`filter-pill ${brand === b ? "active" : ""}`}
                  onClick={() => setBrand(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="filter-select"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* ---------- FULL CATALOG, FULL WIDTH ---------- */}
      <section className="section reveal">
        <div className="pcard-section-full">
          <p style={{ marginBottom: 20 }}>
            Showing {filtered.length} of {products.length} styles
          </p>
          {filtered.length === 0 ? (
            <p>No styles match those filters yet. Try a different combination.</p>
          ) : (
            <div className="pcard-grid pcard-grid--catalog">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{ id: p.id, name: p.name, price: p.price, badge: p.badge, images: p.images }}
                />
              ))}
            </div>
          )}

          <div className="demo-note">
            <Copy path="shop.note" fallback={shop.note} />
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section section--dark reveal">
        <div className="wrap cta-band">
          <span className="eyebrow">Visit Us</span>
          <h2>Find Your Perfect Frame In Person</h2>
          <p>Try on the full collection at our Dehiwala boutique.</p>
          <Link href="/contact" className="btn btn--primary">
            Get Directions
          </Link>
        </div>
      </section>
    </>
  );
}
