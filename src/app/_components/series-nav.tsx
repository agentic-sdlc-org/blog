import Link from "next/link";
import { Post } from "@/interfaces/post";

type Props = {
  series: string;
  currentSlug: string;
  posts: Post[];
};

export function SeriesNav({ series, currentSlug, posts }: Props) {
  const siblings = posts
    .filter((p) => p.series === series)
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0));

  if (siblings.length < 2) {
    return null;
  }

  return (
    <aside
      className="max-w-2xl mx-auto mt-16 pt-8"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <p
        className="text-sm uppercase tracking-wide mb-6"
        style={{ color: "var(--color-muted)" }}
      >
        More in this series: {series}
      </p>
      <ol className="space-y-6 list-none p-0">
        {siblings.map((p) => {
          const isCurrent = p.slug === currentSlug;
          return (
            <li key={p.slug}>
              <p
                className="text-sm font-bold mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Part {p.part}
                {isCurrent ? " · you are here" : ""}
              </p>
              {isCurrent ? (
                <p
                  className="text-lg font-bold"
                  style={{ color: "var(--color-muted)" }}
                >
                  {p.title}
                </p>
              ) : (
                <>
                  <h3 className="text-lg font-bold leading-snug">
                    <Link
                      href={`/posts/${p.slug}`}
                      className="underline"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p
                    className="text-sm mt-1 leading-relaxed"
                    style={{ color: "var(--color-body)" }}
                  >
                    {p.excerpt}
                  </p>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
