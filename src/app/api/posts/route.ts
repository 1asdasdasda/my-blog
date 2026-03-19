import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, users } from '@/lib/db/schema';
import { generateSlug } from '@/lib/utils';
import { eq, desc, and } from 'drizzle-orm';

// 获取文章列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'published';

    const offset = (page - 1) * limit;

    const allPosts = await db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      coverImage: posts.coverImage,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      author: {
        id: users.id,
        username: users.username,
        avatar: users.avatar,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.status, status))
    .orderBy(desc(posts.publishedAt))
    .limit(limit)
    .offset(offset);

    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error('获取文章列表错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 创建文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, coverImage, authorId, status } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: '标题、内容和作者ID为必填项' },
        { status: 400 }
      );
    }

    // 生成唯一slug
    let slug = generateSlug(title);
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    const [newPost] = await db.insert(posts).values({
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 200),
      coverImage,
      authorId,
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date() : null,
    }).returning();

    return NextResponse.json({
      message: '文章创建成功',
      post: newPost,
    });
  } catch (error) {
    console.error('创建文章错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}