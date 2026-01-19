export default function ConsultationPage() {
  return (
    <section
      id="consultation"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      <h1 className="text-4xl font-bold mb-4">استشارة مجانية</h1>
      <p className="text-gray-300 mb-8 max-w-xl">
        احكيلي عن مشروعك، ونشوف مع بعض أفضل حل يناسبك.
      </p>

      <a
        href="https://wa.me/201011501249"
        className="px-6 py-3 rounded-full bg-accent text-black font-semibold"
      >
        تواصل الآن
      </a>
    </section>
  );
}
