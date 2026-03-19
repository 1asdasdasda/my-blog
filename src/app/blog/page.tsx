import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";

// 模拟文章数据
const allPosts = [
  {
    id: 1,
    title: "欢迎来到我的个人博客",
    slug: "welcome-to-my-blog",
    excerpt: "这是我创建的第一个博客项目，使用 Next.js 构建。",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    publishedAt: new Date().toISOString(),
    author: { username: "博主" }
  },
  {
    id: 2,
    title: "为什么选择 Next.js",
    slug: "why-nextjs",
    excerpt: "Next.js 提供了出色的开发体验和性能表现。",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    author: { username: "博主" }
  },
  {
    id: 3,
    title: "开始使用 Tailwind CSS",
    slug: "getting-started-tailwind",
    excerpt: "Tailwind CSS 让样式编写变得简单而高效。",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    author: { username: "博主" }
  },
  {
    id: 4,
    title: "TypeScript 入门指南",
    slug: "typescript-getting-started",
    excerpt: "TypeScript 为 JavaScript 带来了类型系统，让代码更可靠。",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    author: { username: "博主" }
  },
  {
    id: 5,
    title: "响应式设计最佳实践",
    slug: "responsive-design-best-practices",
    excerpt: "让网站在各种设备上都能良好展示。",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    author: { username: "博主" }
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          博客文章
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          共 {allPosts.length} 篇文章
        </p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}