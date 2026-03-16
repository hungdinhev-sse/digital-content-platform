import { notFound } from "next/navigation";
import ArticleList from "@/components/article/ArticleList";
import {
  getArticlesByCategorySlug,
  getCategoryBySlug,
} from "@/lib/content";

// This dynamic route handles category landing pages.
// It fetches the category itself and all articles that belong to it.

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  // If the category itself does not exist, we should render the framework 404 page.
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