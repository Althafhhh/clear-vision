"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

const ACCORDION_SECTIONS = ["Details", "Size & Fit Guide", "Shipping | Returns"] as const;

// Fallback suffixes when a product has no Notion "Photos" uploaded yet:
// main.jpg is the default hero shot, a/b/c.jpg are alternate angles.
const FALLBACK_SUFFIXES = ["main", "a", "b", "c"] as const;

export default function ProductDetailClient({
  product,
  allProducts,
}: {
  product: Product;
  allProducts: Product[];
}) {
  const { addItem } = useCart();
  const [activeColor, setActiveColor] = useState(product.colors?.[0] ?? "");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const photos =
    product.images && product.images.length > 0
      ? product.images
      : FALLBACK_SUFFIXES.map((suffix) => `/images/product-${product.id}-${suffix}.jpg`);

  const similar = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <section className="section" style={{ paddingTop: 32 }}>
      <div className="wrap">
        <div className="breadcrumb" style={{ marginBottom: 24 }}>
          <Link href="/shop">Shop</Link> / {product.category} / {product.name}
        </div>

        <div className="pdp-layout">
          {/* ---------- GALLERY ---------- */}
          <div className="pdp-gallery">
            <div className="pdp-thumbs">
              {photos.map((src, i) => (
                <button
                  key={src}
                  className={`pdp-thumb ${activeIndex === i ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View photo ${i + 1}`}
                >
                  <SmartImage
                    src={src}
                    alt={`${product.name} ${i + 1}`}
                    fallbackLabel={`${i + 1}`}
                    adaptiveBg
                  />
                </button>
              ))}
            </div>
            <div className="pdp-main-photo">
              <SmartImage
                src={photos[activeIndex]}
                alt={product.name}
                fallbackLabel={product.name}
                adaptiveBg
              />
            </div>
          </div>

          {/* ---------- INFO ---------- */}
          <div className="pdp-info">
            {product.badge && <span className="eyebrow">{product.badge}</span>}
            <h1 style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>{product.name}</h1>
            <div className="pdp-price">{product.price}</div>

            <p style={{ marginTop: 18 }}>{product.description}</p>

            {product.colors && (
              <div className="pdp-colors">
                <div className="pdp-colors-label">{activeColor}</div>
                <div className="pdp-swatch-row">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`pdp-swatch ${activeColor === color ? "active" : ""}`}
                      onClick={() => setActiveColor(color)}
                      aria-label={color}
                    >
                      {color[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className="pdp-add-btn"
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
            >
              Add to Cart
            </button>

            <p className="form-note" style={{ marginTop: 14 }}>
              Easy returns up to 30 days · Free adjustments for life
            </p>

            <div className="pdp-accordion">
              {ACCORDION_SECTIONS.map((section) => (
                <div key={section} className="pdp-accordion-item">
                  <button
                    className="pdp-accordion-trigger"
                    onClick={() => setOpenSection(openSection === section ? null : section)}
                  >
                    {section}
                    <span>{openSection === section ? "−" : "+"}</span>
                  </button>
                  {openSection === section && (
                    <div className="pdp-accordion-body">
                      {section === "Details" && <p>{product.details}</p>}
                      {section === "Size & Fit Guide" && (
                        <p>
                          Standard adult fit. Bring your current glasses or prescription in-store
                          and our optometrist will confirm the right fit for your face shape.
                        </p>
                      )}
                      {section === "Shipping | Returns" && (
                        <p>
                          Ready for collection within 2 hours for in-stock frames with a
                          same-day prescription fit. Easy returns within 30 days of purchase.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- SIMILAR ITEMS ---------- */}
        <div style={{ marginTop: 72 }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Similar Items</h2>
          <div className="pcard-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {similar.map((p) => (
              <ProductCard
                key={p.id}
                product={{ id: p.id, name: p.name, price: p.price, badge: p.badge, images: p.images }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
