import { getAllPosts } from "@/lib/api";
import Header from "@/app/_components/header";
import Container from "@/app/_components/container";
import { PostsGallery } from "@/app/_components/posts-gallery";

export const metadata = {
  title: "Posts | Agentic-SDLC.org",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main style={{ backgroundColor: "var(--color-cream)" }}>
      <Container>
        <Header />
      </Container>
      <PostsGallery posts={posts} />
    </main>
  );
}
