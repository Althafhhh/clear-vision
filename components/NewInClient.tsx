"use client";

import Link from "next/link";
import content from "@/content";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import Copy from "@/components/Copy";
import type { Product } from "@/lib/products";

export default function NewInClient({ products }: { products: Product[] }) {
  const { brands } = content;
  const newInProducts = products.filter((p) => p.badge === "New In");

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">New In</span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
            <Copy path="newIn.title" fallback="Just Landed" />
          </h1>
          <p style={{ maxWidth: 520, marginTop: 10 }}>
            <Copy
              path="newIn.subtitle"
              fallback="The newest frames and sunglasses to arrive at Clear Vision."
            />
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / New In
          </div>
        </div>
      </section>

      {/* ---------- FEATURED, FULL WIDTH ---------- */}
      <section className="section reveal">
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

      {/* ---------- BRANDS ---------- */}
      <section className="section section--alt reveal">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="eyebrow">Shop By Brand</span>
            <h2>Brands We Carry</h2>
          </div>

          <div className="brand-card-grid">
            {brands.map((brand) => (
              <Link key={brand.slug} href={`/shop?brand=${brand.slug}`} className="brand-card">
                {/* File: public/images/brand-{brand.slug}.jpg, aspect ratio 4:3 */}
                <div className="brand-card-photo">
                  <SmartImage
                    src={`/images/brand-${brand.slug}.jpg`}
                    alt={brand.name}
                    fallbackLabel={brand.name}
                  />
                </div>
                <div className="brand-card-name">{brand.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
