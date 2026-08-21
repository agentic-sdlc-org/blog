import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkGfm).use(html).process(markdown);

  // Wrap tables so they can scroll horizontally instead of being crushed on narrow screens.
  return result
    .toString()
    .replace(/<table>/g, "<div data-table-wrap><table>")
    .replace(/<\/table>/g, "</table></div>");
}
