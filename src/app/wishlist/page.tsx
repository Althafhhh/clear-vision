import type { Metadata } from "next";
import WishlistClient from "@/components/WishlistClient";

export const metadata: Metadata = {
  title: "My Wishlist: Clear Vision",
  description: "Frames and sunglasses you've saved for later.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
