import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      {/* Full-width cover image */}
      <div className="mb-8 -mx-5">
        <CoverImage title={title} src={coverImage} />
      </div>

      {/* Two-column: author sidebar + article meta */}
      <div className="flex gap-12 mb-8">
        {/* Left: author */}
        <div className="hidden md:block w-48 flex-shrink-0">
          <img
            src={author.picture}
            alt={author.name}
            className="w-10 h-10 rounded-full mb-3"
          />
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
            BY {author.name}
          </p>
        </div>

        {/* Right: title + date */}
        <div className="flex-1">
          <h1
            className="text-4xl md:text-5xl font-normal leading-tight mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            {title}
          </h1>
          <div className="text-sm mb-6" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
            <DateFormatter dateString={date} />
          </div>
          <div
            className="w-full h-px"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </div>
      </div>

      {/* Mobile author */}
      <div className="flex items-center gap-3 mb-6 md:hidden">
        <img src={author.picture} alt={author.name} className="w-8 h-8 rounded-full" />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
          {author.name}
        </span>
        <span className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
          · <DateFormatter dateString={date} />
        </span>
      </div>
    </>
  );
}
