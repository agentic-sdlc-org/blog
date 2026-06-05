import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="flex gap-12">
      {/* Spacer to match author sidebar width */}
      <div className="hidden md:block w-48 flex-shrink-0" />
      <div className="flex-1 max-w-2xl">
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
