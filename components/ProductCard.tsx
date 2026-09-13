"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SmartImage from "@/components/SmartImage";

type Product = {
  id: string;
  name: string;
  price: string;
  badge?: string; // e.g. "New In" / "Most Wanted"
  images?: string[]; // Notion "Photos" field, in upload order. Optional.
};

export default function ProductCard({
  product,
  size = "default",
}: {
  product: Product;
  size?: "default" | "small";
}) {
  const { addItem } = useCart();
  const { toggleItem, isSaved } = useWishlist();
  const saved = isSaved(product.id);

  // Prefer real photos from Notion when present; otherwise fall back to
  // the /public/images/{id}-a.jpg / -b.jpg naming convention.
  const defaultPhoto = product.images?.[0] ?? `/images/product-${product.id}-a.jpg`;
  const hoverPhoto = product.images?.[1] ?? product.images?.[0] ?? `/images/product-${product.id}-b.jpg`;

  return (
    <div className={`pcard ${size === "small" ? "pcard--small" : ""}`}>
      {product.badge && <span className="pcard-badge">{product.badge}</span>}

      <button
        className={`pcard-heart ${saved ? "active" : ""}`}
        onClick={() =>
          toggleItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
          })
        }
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

      <Link href={`/shop/${product.id}`}>
        <div className="pcard-photo">
          <div className="pcard-photo-default">
            <SmartImage src={defaultPhoto} alt={product.name} fallbackLabel={product.name} adaptiveBg />
          </div>
          <div className="pcard-photo-hover">
            <SmartImage src={hoverPhoto} alt={`${product.name} detail`} fallbackLabel="Detail view" adaptiveBg />
          </div>
        </div>

        <div className="pcard-body">
          <div className="pcard-name">{product.name}</div>
          <div className="pcard-price">{product.price}</div>
        </div>
      </Link>

      <button
        className="pcard-add"
        onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
      >
        Add to Cart
      </button>
    </div>
  );
}
