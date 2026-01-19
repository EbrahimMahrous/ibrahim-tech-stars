import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      // className="text-white"
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
