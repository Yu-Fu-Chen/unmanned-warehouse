import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "SkyCourier 無人機科技",
  description: "15 分鐘極速外送，端到端無人機配送方案",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-dvh bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold">
              SkyCourier
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">首頁</Link>
              <Link href="/contact" className="hover:underline">聯絡我們</Link>
              <Link href="/upload" className="hover:underline">上傳圖片</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-16 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} SkyCourier
          </div>
        </footer>
      </body>
    </html>
  );
}