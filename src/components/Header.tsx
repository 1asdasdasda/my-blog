'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
          我的博客
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            首页
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600">
            文章
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}