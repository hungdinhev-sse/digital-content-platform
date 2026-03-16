import ArticleDetail from "@/components/article/ArticleDetail";
import { getArticleBySlug } from "@/lib/content";
import { notFound } from "next/navigation";

// This route file should stay thin.
// Its responsibilities are:
// 1) read the slug from route params
// 2) fetch the article
// 3) trigger 404 if missing
// 4) hand the data to a UI component

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}