import ArticleDetail from "@/components/article/ArticleDetail";
import { getArticleBySlug, getArticleSlugs } from "@/lib/content";
import { notFound } from "next/navigation";

// Article detail pages are a good fit for timed revalidation:
// content is mostly read-heavy and can tolerate slight staleness.
export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

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