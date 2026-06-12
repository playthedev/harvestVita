import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/HeaderAuth";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import { CartProvider } from "../lib/CartContext";
import { locales, isLocale, type Locale } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";

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

const descriptions: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  en: {
    title: "HarvestVita — By Amoohaa Farms",
    description:
      "Pure, nourishing ingredients rooted in authenticity. Dehydrated fruits & vegetables, cold-pressed oils, heritage flours, and whole spices. Farm to home.",
    ogDescription: "Honest food. Thoughtful processing. The richness of the farm, delivered to your home.",
  },
  fr: {
    title: "HarvestVita — Par Amoohaa Farms",
    description:
      "Des ingrédients purs et authentiques. Fruits et légumes déshydratés, huiles pressées à froid, farines ancestrales et épices entières. De la ferme à la maison.",
    ogDescription: "Une alimentation honnête. Une transformation réfléchie. La richesse de la ferme, livrée chez vous.",
  },
  de: {
    title: "HarvestVita — Von Amoohaa Farms",
    description:
      "Reine, nährende Zutaten mit Authentizität. Getrocknete Früchte & Gemüse, kaltgepresste Öle, traditionelles Mehl und ganze Gewürze. Vom Hof nach Hause.",
    ogDescription: "Ehrliches Essen. Durchdachte Verarbeitung. Der Reichtum des Hofes, zu Ihnen geliefert.",
  },
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const t = descriptions[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    keywords:
      "organic food, natural ingredients, cold pressed oils, khapali atta, dehydrated vegetables, whole spices, Amoohaa Farms",
    openGraph: {
      title: t.title,
      description: t.ogDescription,
      type: "website",
      images: [{ url: "/icon.png", width: 1024, height: 1024, alt: "HarvestVita" }],
    },
    alternates: {
      languages: {
        en: '/en',
        fr: '/fr',
        de: '/de',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'en';
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <SmoothScroll />
          <Header locale={locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} dict={dict} />
        </CartProvider>
      </body>
    </html>
  );
}
