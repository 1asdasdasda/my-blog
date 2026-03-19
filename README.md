# 🚀 个人博客系统

一个使用 Next.js 构建的现代化个人博客系统，支持文章管理、评论系统、标签分类等功能。

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind CSS-4-06B6D2)

## ✨ 特性

- 📝 文章管理 - 完整的 CRUD 功能
- 🏷️ 标签系统 - 支持文章标签分类
- 💬 评论系统 - 读者可以发表评论
- 📱 响应式设计 - 完美支持移动端
- 🎨 美观的 UI - 使用 Tailwind CSS
- 🔒 管理员后台 - 方便管理文章
- 🔗 API 接口 - 完整的 RESTful API

## 🛠️ 技术栈

- **前端框架**: Next.js 16 (App Router)
- **UI 框架**: React 19 + Tailwind CSS 4
- **数据库**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **部署**: Vercel

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/my-blog.git
cd my-blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env` 并配置：

```env
DATABASE_URL=your_postgresql_connection_string
```

### 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

### 5. 构建生产版本

```bash
npm run build
npm run start
```

## 📁 项目结构

```
my-blog/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API 路由
│   │   ├── blog/         # 博客页面
│   │   ├── admin/        # 管理后台
│   │   └── page.tsx      # 首页
│   ├── components/       # React 组件
│   └── lib/              # 工具函数和数据库
├── public/               # 静态资源
├── drizzle/              # Drizzle 配置
└── package.json
```

## 📡 API 接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/posts | 获取文章列表 |
| POST | /api/posts | 创建文章 |
| GET | /api/posts/[slug] | 获取单篇文章 |
| PUT | /api/posts/[slug] | 更新文章 |
| DELETE | /api/posts/[slug] | 删除文章 |
| GET | /api/comments | 获取评论列表 |
| POST | /api/comments | 创建评论 |
| POST | /api/auth/login | 用户登录 |

## 🔧 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署完成！

## 📄 许可证

MIT License - 欢迎开源和使用！

---

⭐ 如果这个项目对你有帮助，欢迎 Star！