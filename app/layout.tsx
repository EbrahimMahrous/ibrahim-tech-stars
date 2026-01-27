import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "إبراهيم | فريلانسر متخصص في تحويل الأفكار إلى مشاريع وحلول تقنية احترافية",
  description: "مهندس واجهات أمامية متخصص في بناء تجارب رقمية استثنائية",
  keywords: ["تطوير ويب", "تصميم جرافيك", "SEO", "متاجر إلكترونية", "Node.js"],
  authors: [{ name: "إبراهيم" }],
  creator: "إبراهيم",

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },

  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://ibrahim.dev",
    title: "إبراهيم | رحلة البناء الرقمي",
    description: "مهندس واجهات أمامية متخصص في بناء تجارب رقمية استثنائية",
    siteName: "إبراهيم",
  },

  twitter: {
    card: "summary_large_image",
    title: "إبراهيم | رحلة البناء الرقمي",
    description: "مهندس واجهات أمامية متخصص في بناء تجارب رقمية استثنائية",
    creator: "@ibrahimdev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
