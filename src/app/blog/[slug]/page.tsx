import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 模拟文章数据
const postsData: Record<string, any> = {
  "welcome-to-my-blog": {
    id: 1,
    title: "欢迎来到我的个人博客",
    slug: "welcome-to-my-blog",
    content: `
# 欢迎来到我的个人博客

这是我的第一个博客项目！我使用 **Next.js** 和 **Tailwind CSS** 构建了这个网站。

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL (Neon)
- **部署**: Vercel

## 为什么要写博客？

1. 记录学习过程
2. 分享技术知识
3. 锻炼表达能力
4. 建立个人品牌

希望你喜欢这个博客！

---

*欢迎在评论区留言交流*
    `,
    excerpt: "这是我创建的第一个博客项目，使用 Next.js 构建。",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    publishedAt: new Date().toISOString(),
    author: { username: "博主" },
    tags: ["Next.js", "博客", "React"]
  },
  "why-nextjs": {
    id: 2,
    title: "为什么选择 Next.js",
    slug: "why-nextjs",
    content: `
# 为什么选择 Next.js

Next.js 是 React 生态中最流行的全栈框架之一。

## 主要优势

### 1. 服务器端渲染 (SSR)
Next.js 原生支持 SSR，能够提供更好的 SEO 和首屏加载速度。

### 2. 文件系统路由
基于文件系统的路由简单直观，无需额外配置。

### 3. API 路由
无需单独部署后端服务，可以直接在 Next.js 中创建 API。

### 4. 丰富的生态系统
Vercel 提供了完善的部署和优化工具。

## 总结

Next.js 让全栈开发变得简单高效，非常适合构建现代 Web 应用。
    `,
    excerpt: "Next.js 提供了出色的开发体验和性能表现。",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    author: { username: "博主" },
    tags: ["Next.js", "React", "前端"]
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsData[slug as string] || postsData["welcome-to-my-blog"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Header />
      
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* 返回按钮 */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 mb-8 hover:underline"
        >
          ← 返回文章列表
        </Link>

        {/* 封面图 */}
        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
          />
        )}

        {/* 标题 */}
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          {post.title}
        </h1>

        {/* 元信息 */}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-8">
          <span>{post.author.username}</span>
          <span>•</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('zh-CN')}</span>
          {post.tags && (
            <>
              <span>•</span>
              <div className="flex gap-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 内容 */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content.split('\n').map((line: string, i: number) => {
            if (line.startsWith('# ')) {
              return <h1 key={i}>{line.slice(2)}</h1>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={i}>{line.slice(3)}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i}>{line.slice(4)}</h3>;
            }
            if (line.startsWith('- ')) {
              return <li key={i}>{line.slice(2)}</li>;
            }
            if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
              return <li key={i}>{line.slice(3)}</li>;
            }
            if (line.trim() === '---') {
              return <hr key={i} className="my-8" />;
            }
            if (line.trim() === '') {
              return <br key={i} />;
            }
            return <p key={i} className="my-2">{line}</p>;
          })}
        </div>

        {/* 评论区占位 */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            评论区
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            评论功能开发中...
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}