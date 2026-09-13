"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Copy from "@/components/Copy";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, openCart } = useCart();

  return (
    <>
      {/* Dimmed backdrop — click to close */}
      <div
        className={`drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-label="Shopping cart">
        <div className="drawer-header">
          <h3 style={{ marginBottom: 0 }}>
            Cart<sup style={{ fontSize: 12 }}>{items.length}</sup>
          </h3>
          <button className="drawer-close" onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            {/*
              CART EMPTY GLYPH
              File: public/images/cart-glyph.png (optional)
              Aspect ratio: 1:1
              Location: Cart drawer empty state
              Subject: Brand glyph/icon — currently a simple eye/lens SVG mark
            */}
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="12" r="5" stroke="#3B2A1E" strokeWidth="1.3" />
              <circle cx="19" cy="12" r="5" stroke="#3B2A1E" strokeWidth="1.3" />
              <path d="M14 12H16" stroke="#3B2A1E" strokeWidth="1.3" />
              <path d="M4 12L1 10" stroke="#3B2A1E" strokeWidth="1.3" />
            </svg>
            <h3>
              <Copy path="cart.emptyTitle" fallback="Your Cart is Empty" />
            </h3>
            <div className="drawer-empty-actions">
              <Link href="/shop" className="btn btn--outline" onClick={closeCart}>
                Shop New Arrivals
              </Link>
              <Link href="/shop" className="btn btn--outline" onClick={closeCart}>
                Women&apos;s Exclusive
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((item) => (
                <div key={item.id} className="drawer-item">
                  <div className="drawer-item-photo" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      Qty {item.qty}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                      {item.price}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      fontSize: 16,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="drawer-footer">
              <Link href="/contact" className="btn btn--primary" onClick={closeCart} style={{ width: "100%", textAlign: "center" }}>
                Enquire About These Items
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

// Re-export the trigger so the navbar can open the drawer without importing
// useCart directly in a file that might be rendered too early.
export function useCartTrigger() {
  return useCart().openCart;
}
