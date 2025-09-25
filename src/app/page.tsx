export const revalidate = 3600;

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-white p-10 shadow-sm">
        <h1 className="text-3xl text-gray-500 font-bold">沃爾科技，立於2007年</h1>
        <p className="mt-2 text-gray-600">清新的空氣，需要好的氣體微污染監測系統</p>
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
          { title: "環保(污染防治)監測設備", desc: "通過ISO...，符合環保規範" },
          { title: "無塵室相關監測設備", desc: "擁有多家大廠客群，ex:TSMC，UMC，華邦，力晶，友達，奇美..." },
          { title: "半導體、LCD及光電相關產品", desc: "無所不在，隨處可見" },
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
        <h2 className="text-2xl font-semibold">準備好提升空氣品質了嗎？</h2>
        <p className="mt-2 text-gray-200">留下需求，我們 24 小時內回覆。</p>
        <Link href="/contact" className="mt-4 inline-block rounded-xl bg-white px-5 py-3 text-black">
          立即聯絡
        </Link>
      </section>
    </div>
  );
}