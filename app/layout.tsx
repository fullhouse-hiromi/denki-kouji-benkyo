import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "電気工事士 学習アプリ",
  description: "第一種・第二種電気工事士の筆記試験対策アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased min-h-screen">
        <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">⚡</span>
              <span className="font-bold text-lg text-blue-400">電工マスター</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/progress" className="text-gray-400 hover:text-white transition-colors">
                進捗
              </Link>
              <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                プロフィール
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
