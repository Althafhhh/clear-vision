"use client";

import Link from "next/link";
import content from "@/content";
import StickyHero from "@/components/StickyHero";
import ProductCard from "@/components/ProductCard";
import SmartImage from "@/components/SmartImage";
import Copy, { useCopyText } from "@/components/Copy";
import type { Product } from "@/lib/products";

export default function HomeClient({ products }: { products: Product[] }) {
  const { home, shop } = content;

  return (
    <>
      {/* ---------- STICKY HERO ---------- */}
      <StickyHero
        eyebrow={useCopyText("home.stickyHeroes.0.eyebrow", home.stickyHeroes[0].eyebrow)}
        title={useCopyText("home.stickyHeroes.0.title", home.stickyHeroes[0].title)}
        cta={{
          label: useCopyText("home.stickyHeroes.0.cta.label", home.stickyHeroes[0].cta.label),
          href: home.stickyHeroes[0].cta.href,
        }}
        eager
        image={home.stickyHeroes[0].image}
      />

      {/* ---------- FEATURED PRODUCTS (full width, edge to edge, no gaps) ---------- */}
      <section className="section reveal" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="wrap" style={{ textAlign: "center", marginBottom: 8 }}>
          <span className="eyebrow">New In</span>
          <h2>Featured Frames</h2>
        </div>
        <div className="pcard-grid pcard-grid--flush">
          {products.slice(0, 6).map((p) => (
            <ProductCard
              key={p.id}
              product={{ id: p.id, name: p.name, price: p.price, badge: p.badge, images: p.images }}
            />
          ))}
        </div>
      </section>

      {/* ---------- INTRO STRIP ---------- */}
      <section className="hero">
        <div className="hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div className="hero-copy" style={{ textAlign: "center", margin: "0 auto" }}>
            <span className="eyebrow">
              <Copy path="home.heroEyebrow" fallback={home.heroEyebrow} />
            </span>
            <h1>
              <Copy path="home.heroTitle" fallback={home.heroTitle} />
            </h1>
            <p style={{ margin: "20px auto 32px" }}>
              <Copy path="home.heroSubtitle" fallback={home.heroSubtitle} />
            </p>
            <div className="hero-ctas" style={{ justifyContent: "center" }}>
              <Link href={home.heroCtaPrimary.href} className="btn btn--primary">
                <Copy path="home.heroCtaPrimary.label" fallback={home.heroCtaPrimary.label} />
              </Link>
              <Link href={home.heroCtaSecondary.href} className="btn btn--outline">
                <Copy path="home.heroCtaSecondary.label" fallback={home.heroCtaSecondary.label} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT STRIP ---------- */}
      <section className="section section--alt reveal">
        <div className="wrap">
          <div className="split-row">
            <div>
              <span className="eyebrow">
                <Copy path="home.aboutEyebrow" fallback={home.aboutEyebrow} />
              </span>
              <h2>
                <Copy path="home.aboutTitle" fallback={home.aboutTitle} />
              </h2>
              <p>
                <Copy path="home.aboutText" fallback={home.aboutText} />
              </p>
              <div className="quote-block">
                <Copy path="home.aboutQuote" fallback={home.aboutQuote} />
              </div>
              <div style={{ marginTop: 28 }}>
                <Link href="/about" className="btn btn--outline">
                  Read Our Story
                </Link>
              </div>
            </div>

            {/* File: public/images/about-store.jpg, aspect ratio 4:3 */}
            <div className="split-photo">
              <SmartImage
                src="/images/about-store.jpg"
                alt="Inside the Clear Vision boutique"
                fallbackLabel="Store photo goes here"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SHOP BY CATEGORY ---------- */}
      <section className="section section--alt reveal">
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow">Browse</span>
            <h2>
              <Copy path="home.categoriesTitle" fallback={home.categoriesTitle} />
            </h2>
            <p style={{ maxWidth: 480, margin: "0 auto" }}>
              <Copy path="home.categoriesSubtitle" fallback={home.categoriesSubtitle} />
            </p>
          </div>

          <div className="category-grid">
            {shop.categories.slice(0, 4).map((cat) => (
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

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/collections" className="btn btn--primary">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- VISIT US ---------- */}
      <section className="section--tight reveal">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="eyebrow">Visit Us</span>
            <h2>Our Boutique</h2>
          </div>

          <div className="store-card">
            {/* File: public/images/store-dehiwala.jpg, aspect ratio 4:3 */}
            <div className="store-card-photo">
              <SmartImage
                src="/images/store-dehiwala.jpg"
                alt="Clear Vision, Dehiwala"
                fallbackLabel="Storefront photo goes here"
              />
            </div>
            <div className="store-card-body">
              <h3>Dehiwala</h3>
              <a
                href="https://maps.app.goo.gl/?q=78/C+Sri+Saranankara+Road+Kalubowila+Dehiwala"
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.business.address}
              </a>
              <div className="store-card-hours">
                <span>Mon to Sat</span>
                <span>8.00 to 18.00</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <span className="eyebrow" style={{ marginBottom: 6 }}>
              <Copy path="home.brandsTitle" fallback={home.brandsTitle} />
            </span>
            <div className="brands-strip" style={{ marginTop: 8 }}>
              {home.brands.map((brand) => (
                <span key={brand} className="brand-name">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SECOND STICKY HERO ---------- */}
      <StickyHero
        eyebrow={useCopyText("home.stickyHeroes.1.eyebrow", home.stickyHeroes[1].eyebrow)}
        title={useCopyText("home.stickyHeroes.1.title", home.stickyHeroes[1].title)}
        cta={{
          label: useCopyText("home.stickyHeroes.1.cta.label", home.stickyHeroes[1].cta.label),
          href: home.stickyHeroes[1].cta.href,
        }}
        image={home.stickyHeroes[1].image}
        pinAmount={30}
      />

      {/* ---------- CTA BAND ---------- */}
      <section className="section section--dark reveal">
        <div className="wrap cta-band">
          <span className="eyebrow">Ready When You Are</span>
          <h2>
            <Copy path="home.ctaTitle" fallback={home.ctaTitle} />
          </h2>
          <p>
            <Copy path="home.ctaText" fallback={home.ctaText} />
          </p>
          <Link href={home.ctaButton.href} className="btn btn--primary">
            <Copy path="home.ctaButton.label" fallback={home.ctaButton.label} />
          </Link>
        </div>
      </section>
    </>
  );
}
