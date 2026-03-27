import { notFound } from "next/navigation";
import ArticleList from "@/components/article/ArticleList";
import {
  getArticlesByCategorySlug,
  getCategoryBySlug,
  getCategorySlugs,
} from "@/lib/content";

// Category landing pages are also mostly read-heavy,
// so timed revalidation is a reasonable default.
export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategorySlug(slug);

  return (
    <>
      <h1>{category.name}</h1>
      <p>
        This page shows all articles currently assigned to the{" "}
        <strong>{category.name}</strong> category.
      </p>

      <section>
        <h2>Articles in this category</h2>
        <ArticleList articles={articles} />
      </section>
    </>
  );
}