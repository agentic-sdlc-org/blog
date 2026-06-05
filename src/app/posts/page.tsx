import { getAllPosts } from "@/lib/api";
import Header from "@/app/_components/header";
import Container from "@/app/_components/container";
import { PostsGallery } from "@/app/_components/posts-gallery";

export const metadata = {
  title: "Posts | Agentic-SDLC.org",
};

type Props = {
  searchParams: Promise<{ author?: string }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const { author } = await searchParams;
  const allPosts = getAllPosts();
  const posts = author
    ? allPosts.filter((p) => p.author.name === author)
    : allPosts;

  return (
    <main style={{ backgroundColor: "var(--color-cream)" }}>
      <Container>
        <Header />
        {author && (
          <div className="flex items-center gap-3 mb-6 -mt-4">
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "var(--color-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Posts by <strong style={{ color: "var(--color-ink)" }}>{author}</strong>
            </p>
            <a
              href="/posts"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
                textDecoration: "underline",
              }}
            >
              Clear
            </a>
          </div>
        )}
      </Container>
      <PostsGallery posts={posts} />
    </main>
  );
}
