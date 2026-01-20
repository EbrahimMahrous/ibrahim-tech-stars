import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
