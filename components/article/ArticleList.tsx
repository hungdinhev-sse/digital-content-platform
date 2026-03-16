import type { Article } from "@/types/content";
import ArticleCard from "@/components/article/ArticleCard";

// This component handles the list-level rendering logic.
// The page does not need to know how each list item is displayed.

type ArticleListProps = {
  articles: Article[];
};

export default function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <ul style={{ paddingLeft: "1.25rem" }}>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </ul>
  );
}