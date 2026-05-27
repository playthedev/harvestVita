import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/HeaderAuth";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import { CartProvider } from "./lib/CartContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harvestvita.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HarvestVita — By Amoohaa Farms",
  description:
    "Pure, nourishing ingredients rooted in authenticity. Dehydrated fruits & vegetables, cold-pressed oils, heritage flours, and whole spices. Farm to home.",
  keywords:
    "organic food, natural ingredients, cold pressed oils, khapali atta, dehydrated vegetables, whole spices, Amoohaa Farms",
  openGraph: {
    title: "HarvestVita — By Amoohaa Farms",
    description:
      "Honest food. Thoughtful processing. The richness of the farm, delivered to your home.",
    type: "website",
    images: [{ url: "/icon.png", width: 1024, height: 1024, alt: "HarvestVita" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <SmoothScroll />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
