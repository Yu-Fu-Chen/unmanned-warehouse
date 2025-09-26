export const revalidate = 3600;

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-white p-10 shadow-sm">
        <h1 className="text-3xl text-gray-500 font-bold">SuperLaser，創立於2025年</h1>
        <p className="mt-2 text-gray-600">專業高功率光纖雷射與衛星雷射通訊</p>
        <div className="mt-6 flex gap-3">
          <Link href="/contact" className="rounded-xl bg-black px-5 py-3 text-white">
            聯絡我們
          </Link>
          <a href="#scenarios" className="rounded-xl bg-black px-5 py-3 text-white">
            了解更多
          </a>
        </div>
      </section>

      <section id="scenarios" className="text-gray-500 grid gap-6 md:grid-cols-3">
        {[
          { title: "光纖雷射共振腔", desc: "透過嚴格的設計模擬和實驗驗證，提高產品品質並降低了用戶的營運成本" },
          { title: "光纖元件", desc: "卓越的光束品質、低插入損耗和高效率" },
          { title: "太空雷射通訊", desc: "供高效率、低訊號插入損耗和優異的光束品質，並能滿足太空放大器的運行要求" },
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

      <section className="rounded-2xl bg-gradient-to-br from-black to-gray-700 p-8 text-white">
        <h2 className="text-2xl font-semibold">我們以對廣泛技術的探索和研究能力為傲，為客戶提供最佳解決方案</h2>
        <p className="mt-2 text-gray-200">留下需求，我們 24 小時內回覆。</p>
        <Link href="/contact" className="mt-4 inline-block rounded-xl bg-white px-5 py-3 text-black">
          立即聯絡
        </Link>
      </section>
    </div>
  );
}