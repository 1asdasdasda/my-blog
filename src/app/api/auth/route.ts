import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashPassword, verifyPassword, generateToken } from '@/lib/utils';
import { eq } from 'drizzle-orm';

// 注册
export async function POST(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: '数据库未配置' }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 检查用户是否已存在
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '邮箱已被注册' },
        { status: 400 }
      );
    }

    // 创建用户
    const passwordHash = await hashPassword(password);
    const [newUser] = await db.insert(users).values({
      username,
      email,
      passwordHash,
    }).returning();

    // 生成简单token（生产环境应使用JWT）
    const token = generateToken();

    return NextResponse.json({
      message: '注册成功',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 登录
export async function PUT(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: '数据库未配置' }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: '请输入邮箱和密码' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    const token = generateToken();

    return NextResponse.json({
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}