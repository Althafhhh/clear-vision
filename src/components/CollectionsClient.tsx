"use client";

import Link from "next/link";
import content from "@/content";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import Copy from "@/components/Copy";
import type { Product } from "@/lib/products";

export default function CollectionsClient({ products }: { products: Product[] }) {
  const { shop } = content;
  const newInProducts = products.filter((p) => p.badge === "New In");

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Collections</span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
            <Copy path="collections.title" fallback="Shop by Category" />
          </h1>
          <p style={{ maxWidth: 520, marginTop: 10 }}>{shop.subtitle}</p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Collections
          </div>
        </div>
      </section>

      {/* ---------- CATEGORY CARDS ---------- */}
      <section className="section reveal">
        <div className="wrap">
          <div className="category-grid">
            {shop.categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
              >
                {/* File: public/images/category-{slug}.jpg, aspect ratio 1:1 */}
                <div className="category-photo">
                  <SmartImage
                    src={`/images/category-${cat.slug}.jpg`}
                    alt={cat.name}
                    fallbackLabel={cat.name}
                  />
                </div>
                <div className="category-body">
                  <h3 style={{ fontSize: 16 }}>{cat.name}</h3>
                  <p>{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NEW IN, BELOW THE CATEGORIES ---------- */}
      <section className="section section--alt reveal">
        <div className="wrap" style={{ textAlign: "center", marginBottom: 8 }}>
          <span className="eyebrow">New In</span>
          <h2>Fresh This Season</h2>
        </div>
        <div className="pcard-section-full">
          <div className="pcard-grid pcard-grid--catalog">
            {newInProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={{ id: p.id, name: p.name, price: p.price, badge: p.badge, images: p.images }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
