import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, users } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// 获取单个文章
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      excerpt: posts.excerpt,
      coverImage: posts.coverImage,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      author: {
        id: users.id,
        username: users.username,
        avatar: users.avatar,
        bio: users.bio,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.slug, slug))
    .then((results: any[]) => results[0]);

    if (!post) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('获取文章错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, content, excerpt, coverImage, status } = body;

    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }

    const updateData: any = {
      ...(title && { title }),
      ...(content && { content }),
      ...(excerpt && { excerpt }),
      ...(coverImage && { coverImage }),
      ...(status && { status }),
      updatedAt: new Date(),
    };

    if (status === 'published' && !existingPost.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const [updatedPost] = await db.update(posts)
      .set(updateData)
      .where(eq(posts.slug, slug))
      .returning();

    return NextResponse.json({
      message: '文章更新成功',
      post: updatedPost,
    });
  } catch (error) {
    console.error('更新文章错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }

    await db.delete(posts).where(eq(posts.slug, slug));

    return NextResponse.json({ message: '文章删除成功' });
  } catch (error) {
    console.error('删除文章错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}