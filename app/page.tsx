import ArticleList from "@/components/article/ArticleList";
import PageHero from "@/components/page/PageHero";
import { getHomePageAndArticles } from "@/lib/content";

// This page focuses only on route-level responsibilities:
// fetch data and compose UI components.
// Shared page structure now lives in app/layout.tsx.

export default async function HomePage() {
  const { homePage, articles } = await getHomePageAndArticles();

  return (
    <>
      {homePage && <PageHero page={homePage} />}

      <section>
        <h2>Articles</h2>
        <ArticleList articles={articles} />
      </section>
    </>
  );
}