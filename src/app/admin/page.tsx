"use client";

import Link from "next/link";
import { useState } from "react";

// 模拟文章数据
const mockPosts = [
  { id: 1, title: "欢迎来到我的个人博客", status: "published", publishedAt: "2024-01-15" },
  { id: 2, title: "为什么选择 Next.js", status: "published", publishedAt: "2024-01-14" },
  { id: 3, title: "开始使用 Tailwind CSS", status: "draft", publishedAt: null },
  { id: 4, title: "TypeScript 入门指南", status: "draft", publishedAt: null },
];

export default function AdminPage() {
  const [posts, setPosts] = useState(mockPosts);

  const deletePost = (id: number) => {
    if (confirm("确定要删除这篇文章吗？")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900">
      {/* 管理后台导航 */}
      <nav className="bg-white dark:bg-zinc-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                我的博客
              </Link>
              <span className="text-gray-500">/</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                管理后台
              </span>
            </div>
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
            >
              返回首页
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 操作栏 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            文章管理
          </h1>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            + 新建文章
          </button>
        </div>

        {/* 文章列表 */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-zinc-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  标题
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  发布日期
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-800 dark:text-white font-medium">
                      {post.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status === "published" ? "已发布" : "草稿"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {post.publishedAt || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      编辑
                    </button>
                    <button 
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 统计 */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-indigo-600">{posts.length}</div>
            <div className="text-gray-500 dark:text-gray-400">文章总数</div>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {posts.filter(p => p.status === "published").length}
            </div>
            <div className="text-gray-500 dark:text-gray-400">已发布</div>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {posts.filter(p => p.status === "draft").length}
            </div>
            <div className="text-gray-500 dark:text-gray-400">草稿</div>
          </div>
        </div>
      </main>
    </div>
  );
}