import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

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

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
