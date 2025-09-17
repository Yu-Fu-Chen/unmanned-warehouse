import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold">15 分鐘極速外送 · 無人機端到端方案</h1>
        <p className="mt-2 text-gray-600">合規航線｜安全冗餘｜可與現有 POS/OMS 串接</p>
        <div className="mt-6 flex gap-3">
          <Link href="/contact" className="rounded-xl bg-black px-5 py-3 text-white">
            聯絡我們
          </Link>
          <a href="#scenarios" className="rounded-xl border px-5 py-3">
            了解方案
          </a>
        </div>
      </section>

      <section id="scenarios" className="grid gap-6 md:grid-cols-3">
        {[
          { title: "餐飲外送", desc: "門市到社區/園區的短距配送，支援尖峰期併單" },
          { title: "醫療急件", desc: "院所間檢體/藥品即時運送，全程可稽核" },
          { title: "園區物流", desc: "大型園區點對點配送，內網 API 串接" },
        ].map((s) => (
          <div key={s.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-gray-600">{s.desc}</p>
            <Link href="/contact" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
              洽談情境 →
            </Link>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-black to-gray-800 p-8 text-white">
        <h2 className="text-2xl font-semibold">準備好提升配送效率了嗎？</h2>
        <p className="mt-2 text-gray-200">留下需求，我們 24 小時內回覆。</p>
        <Link href="/contact" className="mt-4 inline-block rounded-xl bg-white px-5 py-3 text-black">
          立即聯絡
        </Link>
      </section>
    </div>
  );
}