import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comments, posts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// 获取文章的评论
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: '缺少文章ID' },
        { status: 400 }
      );
    }

    const allComments = await db.select()
      .from(comments)
      .where(eq(comments.postId, parseInt(postId)))
      .orderBy(comments.createdAt);

    return NextResponse.json({ comments: allComments });
  } catch (error) {
    console.error('获取评论错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 创建评论
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, authorName, authorEmail, content, parentId } = body;

    if (!postId || !authorName || !authorEmail || !content) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 检查文章是否存在
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    });

    if (!post) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      );
    }

    const [newComment] = await db.insert(comments).values({
      postId,
      authorName,
      authorEmail,
      content,
      parentId: parentId || null,
      approved: false, // 需要审核
    }).returning();

    return NextResponse.json({
      message: '评论提交成功，等待审核',
      comment: newComment,
    });
  } catch (error) {
    console.error('创建评论错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}