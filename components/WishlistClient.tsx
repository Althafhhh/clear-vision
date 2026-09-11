"use client";

import Link from "next/link";
import content from "@/content";
import { useWishlist } from "@/context/WishlistContext";
import SmartImage from "@/components/SmartImage";
import Copy, { useCopyText } from "@/components/Copy";

export default function WishlistClient() {
  const { items, toggleItem } = useWishlist();
  const { wishlist } = content;

  return (
    <section className="section" style={{ minHeight: "60vh" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="eyebrow">
          {useCopyText("wishlist.title", wishlist.title)} ({items.length})
        </span>

        {items.length === 0 ? (
          <>
            <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
              <Copy path="wishlist.emptyTitle" fallback={wishlist.emptyTitle} />
            </h1>
            <p style={{ maxWidth: 460, margin: "12px auto 32px" }}>
              <Copy path="wishlist.emptyText" fallback={wishlist.emptyText} />
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/account/login" className="btn btn--primary">
                Log In To Save Your List
              </Link>
              <Link href="/shop" className="btn btn--outline">
                Continue As Guest
              </Link>
            </div>
          </>
        ) : (
          <div className="product-grid" style={{ textAlign: "left" }}>
            {items.map((item) => (
              <div key={item.id} className="product-card">
                <div className="product-photo">
                  <SmartImage
                    src={item.image ?? `/images/product-${item.id}-a.jpg`}
                    alt={item.name}
                    fallbackLabel={item.name}
                  />
                </div>
                <div className="product-body">
                  <h3>{item.name}</h3>
                  <div className="product-price">{item.price}</div>
                  <button
                    className="btn btn--outline"
                    style={{ marginTop: 10, width: "100%" }}
                    onClick={() => toggleItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
