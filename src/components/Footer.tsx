import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">我的博客</p>
            <p className="text-gray-400 text-sm">分享技术，记录生活</p>
          </div>
          <div className="flex gap-6">
            <Link href="/blog" className="text-gray-400 hover:text-white">
              文章
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white">
              关于
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} 我的博客. All rights reserved.
        </div>
      </div>
    </footer>
  );
}