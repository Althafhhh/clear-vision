import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import PageOffset from "@/components/PageOffset";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageWrapper from "@/components/PageWrapper";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Clear Vision: Family Eye Care, Dehiwala, Sri Lanka",
  description:
    "Clear Vision offers comprehensive eye examinations, prescriptions, and a wide selection of affordable frames, lenses, and designer sunglasses in Dehiwala, Sri Lanka. Glasses ready in as little as 2 hours.",
  keywords: [
    "eyewear Sri Lanka",
    "glasses Dehiwala",
    "eye test Colombo",
    "sunglasses Sri Lanka",
    "prescription glasses",
    "Clear Vision Dehiwala",
  ],
  openGraph: {
    title: "Clear Vision: Family Eye Care",
    description:
      "Comprehensive eye examinations, prescriptions, and affordable eyewear: all under one roof in Dehiwala, Sri Lanka.",
    url: "https://clear-vision.vercel.app",
    siteName: "Clear Vision",
    locale: "en_LK",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = (await getSiteContent()) ?? {};

  return (
    <html lang="en">
      <body>
        <SiteContentProvider value={siteContent}>
          <CartProvider>
            <WishlistProvider>
              <PageWrapper>
                <SiteHeader />
                <PageOffset>{children}</PageOffset>
                <Footer />
                <WhatsAppButton />
                <CartDrawer />
              </PageWrapper>
            </WishlistProvider>
          </CartProvider>
        </SiteContentProvider>
      </body>
    </html>
  );
}
