import Link from "next/link";
import type { Article } from "@/types/content";
import CategoryLink from "@/components/category/CategoryLink";

// This component renders a single article preview item.
// We now show category information so the list becomes relation-aware.

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

      {/* 
        Category is optional because some content may not be assigned yet.
        This keeps the UI safe even if the CMS data is incomplete.
      */}
      {article.category && <CategoryLink category={article.category} />}
    </li>
  );
}