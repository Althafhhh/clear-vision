"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import content from "@/content";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SmartImage from "@/components/SmartImage";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenu, setMegaMenu] = useState<"shop" | "collections" | null>(null);
  const { count: cartCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  const byPerson = content.shop.categories.filter((c) =>
    ["mens-eyewear", "womens-eyewear", "kids-eyewear"].includes(c.slug)
  );
  const otherCollections = content.shop.categories.filter(
    (c) => !["mens-eyewear", "womens-eyewear", "kids-eyewear"].includes(c.slug)
  );
  const featuredCategories = content.shop.categories.slice(0, 3);

  // Transparent by default over the hero. Goes white (no blur, just a
  // solid fill) when the user scrolls back up, or is still near the very
  // top. Hover always forces it white too, via CSS.
  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      if (y < 40) {
        setScrolled(false);
      } else if (y < lastY) {
        setScrolled(true); // scrolling up
      } else {
        setScrolled(false); // scrolling down
      }
      lastY = y;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--solid" : "navbar--transparent"}`}>
        <div className="navbar-inner">
          <Link href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/clear-vision-logo.png" alt="Clear Vision" className="logo-image" />
          </Link>

          <nav className="nav-links" onMouseLeave={() => setMegaMenu(null)}>
            <span onMouseEnter={() => setMegaMenu("shop")}>
              <Link href="/shop">Shop</Link>
            </span>
            <Link href="/new-in">New In</Link>
            <span className="nav-spacer" />
            <span onMouseEnter={() => setMegaMenu("collections")}>
              <Link href="/collections">Collections</Link>
            </span>
            <Link href="/account/login">Members</Link>
            <Link href="/contact">Stores</Link>

            {/* ---------- SHOP MEGA MENU ---------- */}
            {megaMenu === "shop" && (
              <div className="mega-menu mega-menu--shop">
                <div className="mega-menu-inner">
                  <div className="mega-col">
                    <span className="mega-col-title">Shop By</span>
                    {byPerson.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setMegaMenu(null)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mega-col">
                    <span className="mega-col-title">Collections</span>
                    {otherCollections.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setMegaMenu(null)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mega-col">
                    <span className="mega-col-title">Brands</span>
                    {content.brands.map((brand) => (
                      <Link
                        key={brand.slug}
                        href={`/shop?brand=${brand.slug}`}
                        onClick={() => setMegaMenu(null)}
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---------- COLLECTIONS MEGA MENU ---------- */}
            {megaMenu === "collections" && (
              <div className="mega-menu mega-menu--collections">
                <div className="mega-menu-grid">
                  {featuredCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/shop?category=${encodeURIComponent(cat.name)}`}
                      className="mega-category-card"
                      onClick={() => setMegaMenu(null)}
                    >
                      {/* File: public/images/category-{slug}.jpg, aspect ratio 3:4 */}
                      <SmartImage
                        src={`/images/category-${cat.slug}.jpg`}
                        alt={cat.name}
                        fallbackLabel={cat.name}
                      />
                      <span className="mega-category-label">{cat.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/collections"
                    className="mega-discover-card"
                    onClick={() => setMegaMenu(null)}
                  >
                    <span>Discover All</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </nav>

          <div className="nav-cta">
            {/* Search — text + blinking cursor, click to reveal an input */}
            <button
              className="nav-search-trigger"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Open search"
            >
              Search<span className="blink-cursor" />
            </button>

            <div className="nav-icon-group">
              <Link href="/account/login" className="icon-btn" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </Link>

              <Link href="/wishlist" className="icon-btn" aria-label="Wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
              </Link>

              <button className="icon-btn" aria-label="Cart" onClick={openCart}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 8h12l-1 12H7L6 8z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
              </button>
            </div>

            <button
              className="hamburger"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="nav-search-panel">
            <div className="search-panel-top">
              <button
                className="search-back-btn"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <input
                autoFocus
                type="text"
                placeholder="Type to search"
                className="search-input-line"
              />

              <button className="search-cart-btn" aria-label="Cart" onClick={openCart}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <hr className="search-divider" />

            <div className="search-suggestions">
              <div className="search-brand-list">
                <span className="eyebrow" style={{ marginBottom: 4 }}>
                  Brands
                </span>
                {content.brands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/shop?brand=${brand.slug}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>

              <div className="search-picture-cards">
                {/* File: public/images/search-look-1.jpg, -2.jpg, -3.jpg, aspect ratio 3:4 */}
                <div className="search-picture-card">
                  <SmartImage src="/images/search-look-1.jpg" alt="Look 1" fallbackLabel="Look 1" />
                </div>
                <div className="search-picture-card">
                  <SmartImage src="/images/search-look-2.jpg" alt="Look 2" fallbackLabel="Look 2" />
                </div>
                <div className="search-picture-card">
                  <SmartImage src="/images/search-look-3.jpg" alt="Look 3" fallbackLabel="Look 3" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile dropdown — fixed sibling, NOT inside <header>.
          iOS Safari clips overflow on sticky elements, so this must live outside. */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          className="hamburger"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          style={{ alignSelf: "flex-end" }}
        >
          <span style={{ transform: "rotate(45deg) translateY(3px)" }} />
          <span style={{ transform: "rotate(-45deg) translateY(-3px)" }} />
        </button>
        <Link href="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
        <Link href="/new-in" onClick={() => setMobileOpen(false)}>New In</Link>
        <Link href="/collections" onClick={() => setMobileOpen(false)}>Collections</Link>
        <Link href="/account/login" onClick={() => setMobileOpen(false)}>Members</Link>
        <Link href="/contact" onClick={() => setMobileOpen(false)}>Stores</Link>
        <Link href="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist</Link>
        <Link href="/appointment" className="btn btn--primary" onClick={() => setMobileOpen(false)}>
          Book Appointment
        </Link>
      </div>
    </>
  );
}
