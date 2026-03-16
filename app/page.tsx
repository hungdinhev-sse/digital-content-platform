import ArticleList from "@/components/article/ArticleList";
import ArticleSearch from "@/components/article/ArticleSearch";
import PageHero from "@/components/page/PageHero";
import { getHomePageAndArticlesByQuery } from "@/lib/content";

// This page stays as a Server Component.
// It reads the query from the URL and fetches filtered data on the server.

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query = "" } = await searchParams;

  const { homePage, articles } = await getHomePageAndArticlesByQuery(query);

  const hasSearchQuery = query.trim().length > 0;

  return (
    <>
      {homePage && <PageHero page={homePage} />}

      <section>
        <h2>Articles</h2>

        <ArticleSearch />

        <ArticleList
          articles={articles}
          emptyMessage={
            hasSearchQuery
              ? `No articles matched "${query}".`
              : "No articles found."
          }
        />
      </section>
    </>
  );
}