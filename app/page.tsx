import ArticleList from "@/components/article/ArticleList";
import ArticleSearch from "@/components/article/ArticleSearch";
import CategoryFilter from "@/components/category/CategoryFilter";
import PageHero from "@/components/page/PageHero";
import {
  getCategories,
  getHomePageAndArticlesByFilters,
} from "@/lib/content";

// This homepage depends on URL search params like query and category,
// so we keep it dynamic instead of treating it like a mostly static page.
export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query = "", category = "" } = await searchParams;

  const [{ homePage, articles }, categories] = await Promise.all([
    getHomePageAndArticlesByFilters(query, category),
    getCategories(),
  ]);

  const hasSearchQuery = query.trim().length > 0;
  const hasCategoryFilter = category.trim().length > 0;

  let emptyMessage = "No articles found.";

  if (hasSearchQuery && hasCategoryFilter) {
    emptyMessage = `No articles matched "${query}" in the selected category.`;
  } else if (hasSearchQuery) {
    emptyMessage = `No articles matched "${query}".`;
  } else if (hasCategoryFilter) {
    emptyMessage = "No articles found in the selected category.";
  }

  return (
    <>
      {homePage && <PageHero page={homePage} />}

      <section>
        <h2>Articles</h2>

        <ArticleSearch />
        <CategoryFilter categories={categories} />

        <ArticleList articles={articles} emptyMessage={emptyMessage} />
      </section>
    </>
  );
}