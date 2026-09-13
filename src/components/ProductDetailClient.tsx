"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/lib/products";

const ACCORDION_SECTIONS = ["Details", "Size & Fit Guide", "Shipping | Returns"] as const;

// Fallback suffixes when a product has no Notion "Photos" uploaded yet:
// main.jpg is the default hero shot, a/b/c.jpg are alternate angles.
const FALLBACK_SUFFIXES = ["main", "a", "b", "c"] as const;

// How far (px) a vertical drag has to travel before the sheet snaps
// open/closed instead of springing back to where it was.
const DRAG_SNAP_THRESHOLD = 60;

export default function ProductDetailClient({
  product,
  allProducts,
}: {
  product: Product;
  allProducts: Product[];
}) {
  const { addItem } = useCart();
  const { toggleItem, isSaved } = useWishlist();
  const saved = isSaved(product.id);

  const [activeColor, setActiveColor] = useState(product.colors?.[0] ?? "");
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Shared "which photo is showing" index — the desktop thumbnail rail
  // and the mobile stacked gallery both read/write this.
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile sheet: collapsed shows just the title + Add to Cart. Expanded
  // is a full-screen overlay (covers the images and the navbar) with
  // everything else. Both a tap and a drag can open/close it.
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStartY = useRef(0);

  const photos =
    product.images && product.images.length > 0
      ? product.images
      : FALLBACK_SUFFIXES.map((suffix) => `/images/product-${product.id}-${suffix}.jpg`);

  const similar = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  function handleAddToCart(e?: React.SyntheticEvent) {
    e?.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price });
  }

  function handleWishlist(e?: React.SyntheticEvent) {
    e?.stopPropagation();
    toggleItem({ id: product.id, name: product.name, price: product.price, image: photos[0] });
  }

  // Mobile photos stack vertically in normal page flow (scrolls down, not
  // sideways). An IntersectionObserver watches each photo and keeps
  // activeIndex pointed at whichever one is most visible, so the capsule
  // indicator on the side tracks scroll position as you scroll down.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = { ratio: 0, index: -1 };
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-index"));
          if (entry.intersectionRatio > best.ratio) {
            best = { ratio: entry.intersectionRatio, index: idx };
          }
        });
        if (best.index >= 0) setActiveIndex(best.index);
      },
      { threshold: [0.5, 0.75, 1] }
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [photos.length]);

  function goToPhoto(index: number) {
    setActiveIndex(index);
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleHandlePointerDown(e: React.PointerEvent) {
    setDragging(true);
    dragStartY.current = e.clientY;
  }
  function handleHandlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    setDragY(e.clientY - dragStartY.current);
  }
  function handleHandlePointerUp() {
    if (!dragging) return;
    setDragging(false);
    if (sheetExpanded && dragY > DRAG_SNAP_THRESHOLD) setSheetExpanded(false);
    else if (!sheetExpanded && dragY < -DRAG_SNAP_THRESHOLD) setSheetExpanded(true);
    setDragY(0);
  }

  const accordionBlock = (
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
                  Standard adult fit. Bring your current glasses or contact lens prescription
                  in-store and our optometrist will confirm the right fit for your face shape.
                </p>
              )}
              {section === "Shipping | Returns" && (
                <p>
                  Ready for collection within 2 hours for in-stock frames with a same-day
                  prescription fit. Easy returns within 30 days of purchase.
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const colorSwatches = product.colors && (
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
  );

  return (
    <section className="section pdp-section" style={{ paddingTop: 32 }}>
      <div className="wrap pdp-wrap">
        <div className="breadcrumb pdp-breadcrumb" style={{ marginBottom: 24 }}>
          <Link href="/shop">Shop</Link> / {product.category} / {product.name}
        </div>

        <div className="pdp-layout">
          {/* ================= DESKTOP: thumbnail rail + single main photo ================= */}
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
                    contain
                  />
                </button>
              ))}
            </div>
            <div className="pdp-main-photo">
              <SmartImage
                src={photos[activeIndex]}
                alt={product.name}
                fallbackLabel={product.name}
                contain
                eager
              />
            </div>
          </div>

          {/* ================= DESKTOP: info sidebar ================= */}
          <div className="pdp-info">
            {product.badge && <span className="eyebrow">{product.badge}</span>}
            <h1 style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>{product.name}</h1>
            <div className="pdp-price">{product.price}</div>
            <p style={{ marginTop: 18 }}>{product.description}</p>
            {colorSwatches}
            <button className="pdp-add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <p className="form-note" style={{ marginTop: 14 }}>
              Easy returns up to 30 days · Free adjustments for life
            </p>
            {accordionBlock}
          </div>

          {/* ================= MOBILE: photos stacked vertically + capsule indicator ================= */}
          <div className="pdp-mobile-carousel-wrap">
            <div className="pdp-mobile-carousel">
              {photos.map((src, i) => (
                <div
                  className="pdp-mobile-slide"
                  key={src}
                  data-index={i}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                >
                  <SmartImage
                    src={src}
                    alt={`${product.name} ${i + 1}`}
                    fallbackLabel={`${i + 1}`}
                    contain
                    eager={i === 0}
                  />
                </div>
              ))}
            </div>

            {photos.length > 1 && (
              <div className="pdp-capsule-track" role="tablist" aria-label="Product photos">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    className={`pdp-capsule ${i === activeIndex ? "active" : ""}`}
                    onClick={() => goToPhoto(i)}
                    aria-label={`Photo ${i + 1} of ${photos.length}`}
                    role="tab"
                    aria-selected={i === activeIndex}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= Similar items (desktop layout; also reused inside the mobile sheet) ================= */}
        <div style={{ marginTop: 72 }} className="pdp-similar pdp-similar--desktop">
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

      {/* ================= MOBILE: collapsed peek bar / full-screen pull-up sheet ================= */}
      <div
        className={`pdp-mobile-sheet ${sheetExpanded ? "expanded" : ""}`}
        style={dragging ? { transform: `translateY(${Math.max(0, dragY)}px)` } : undefined}
      >
        <div
          className="pdp-sheet-handle"
          onPointerDown={handleHandlePointerDown}
          onPointerMove={handleHandlePointerMove}
          onPointerUp={handleHandlePointerUp}
          onPointerCancel={handleHandlePointerUp}
          onClick={() => !dragging && setSheetExpanded((s) => !s)}
        >
          <span className="pdp-sheet-drag-bar" />
        </div>

        {!sheetExpanded ? (
          // ---------- Collapsed: title + colors, big Add to Cart with price ----------
          <div className="pdp-sheet-peek">
            <div className="pdp-sheet-peek-row">
              <span className="pdp-sheet-title">{product.name}</span>
              {product.colors && (
                <div className="pdp-sheet-mini-swatches">
                  {product.colors.slice(0, 4).map((color) => (
                    <span key={color} className="pdp-mini-swatch" title={color} />
                  ))}
                </div>
              )}
            </div>
            <button className="pdp-add-btn pdp-sheet-cta" onClick={handleAddToCart}>
              <span>Add to Cart</span>
              <span>{product.price}</span>
            </button>
          </div>
        ) : (
          // ---------- Expanded: everything except the photos ----------
          <div className="pdp-sheet-content">
            <div className="pdp-sheet-content-header">
              {product.badge && <span className="eyebrow">{product.badge}</span>}
              <button
                className={`pcard-heart pdp-sheet-heart ${saved ? "active" : ""}`}
                onClick={handleWishlist}
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "#3B2A1E" : "none"}>
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="#3B2A1E"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <h1 style={{ fontSize: "clamp(22px, 6vw, 28px)" }}>{product.name}</h1>
            <div className="pdp-price">{product.price}</div>
            <p style={{ marginTop: 14 }}>{product.description}</p>

            {colorSwatches}

            <button className="pdp-add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <p className="form-note" style={{ marginTop: 14 }}>
              Easy returns up to 30 days · Free adjustments for life
            </p>

            {accordionBlock}

            <div className="pdp-similar" style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 18, marginBottom: 8 }}>Similar Items</h2>
              <div className="pcard-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                {similar.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={{ id: p.id, name: p.name, price: p.price, badge: p.badge, images: p.images }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
