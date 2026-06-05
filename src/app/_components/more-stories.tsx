import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
      >
        Recent Essays
        <span className="inline-block ml-2">→</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
