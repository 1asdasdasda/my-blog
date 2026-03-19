import Link from 'next/link';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    publishedAt?: string;
    createdAt?: string;
    author?: {
      username: string;
      avatar?: string;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const date = post.publishedAt || post.createdAt;
  const formattedDate = date 
    ? new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link 
            href={`/blog/${post.slug}`}
            className="text-gray-800 hover:text-blue-600"
          >
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {post.author?.avatar && (
              <img 
                src={post.author.avatar} 
                alt={post.author.username}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span>{post.author?.username || '匿名'}</span>
          </div>
          <time>{formattedDate}</time>
        </div>
      </div>
    </article>
  );
}