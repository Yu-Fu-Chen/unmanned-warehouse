import Link from "next/link";
import "./globals.css";
import PlausibleProvider from 'next-plausible';

export const metadata = {
  title: "SuperLaser 先進科技",
  description: "高功率光纖雷射與衛星雷射通訊",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-dvh bg-gray-50 text-gray-900">
        <PlausibleProvider domain="unmanned-warehouse.vercel.app" />
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-gray-500 font-semibold">
              SuperLaser
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-gray-500 hover:underline">首頁</Link>
              <Link href="/contact" className="text-gray-500 hover:underline">聯絡我們</Link>
              <Link href="/upload" className="text-gray-500 hover:underline">上傳圖片</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-16 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500 font-semibold">
            © {new Date().getFullYear()} SuperLaser
          </div>
        </footer>
      </body>
    </html>
  );
}