import type { Article } from "@/types/content";
import ArticleCard from "@/components/article/ArticleCard";

// This component renders a list of article preview items.
// We also support a custom empty message so pages can explain
// why the list is empty, for example after a search query.

type ArticleListProps = {
  articles: Article[];
  emptyMessage?: string;
};

export default function ArticleList({
  articles,
  emptyMessage = "No articles found.",
}: ArticleListProps) {
  if (articles.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <ul style={{ paddingLeft: "1.25rem" }}>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </ul>
  );
}