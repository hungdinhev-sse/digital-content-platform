import Link from "next/link";
import type { Article } from "@/types/content";

// This component renders a single article preview item.
// Keeping it separate makes the list easier to read and reuse later
// for homepage, category pages, or search results.

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <li style={{ marginBottom: "1rem" }}>
      <h3 style={{ marginBottom: "0.25rem" }}>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>
      <p style={{ margin: 0 }}>{article.excerpt}</p>
    </li>
  );
}