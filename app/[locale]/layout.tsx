import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
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
    <SmoothScrollProvider>
      <div dir={locale === "ar" ? "rtl" : "ltr"}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat locale={locale} />
      </div>
    </SmoothScrollProvider>
  );
}
