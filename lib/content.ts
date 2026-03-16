import { hygraph } from "@/lib/hygraph";
import {
  GET_ARTICLE_BY_SLUG,
  GET_ARTICLES_BY_CATEGORY_SLUG,
  GET_CATEGORY_BY_SLUG,
  GET_HOME_PAGE_AND_ARTICLES,
  GET_HOME_PAGE_AND_FILTERED_ARTICLES,
} from "@/lib/queries";
import type {
  Article,
  ArticleBySlugResponse,
  ArticlesByCategorySlugResponse,
  Category,
  CategoryBySlugResponse,
  HomePageResponse,
  PageItem,
} from "@/types/content";

// This file is the content data access layer.
// Route pages call these helpers instead of talking to Hygraph directly.

export async function getHomePageAndArticles(): Promise<{
  homePage: PageItem | null;
  articles: Article[];
}> {
  const data =
    await hygraph.request<HomePageResponse>(GET_HOME_PAGE_AND_ARTICLES);

  return {
    homePage: data.pages[0] ?? null,
    articles: data.articles ?? [],
  };
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  const data = await hygraph.request<ArticleBySlugResponse>(
    GET_ARTICLE_BY_SLUG,
    { slug }
  );

  return data.articles[0] ?? null;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const data = await hygraph.request<CategoryBySlugResponse>(
    GET_CATEGORY_BY_SLUG,
    { slug }
  );

  return data.categories[0] ?? null;
}

export async function getArticlesByCategorySlug(
  slug: string
): Promise<Article[]> {
  const data = await hygraph.request<ArticlesByCategorySlugResponse>(
    GET_ARTICLES_BY_CATEGORY_SLUG,
    { slug }
  );

  return data.articles ?? [];
}



// This helper supports homepage search.
// The page remains server-rendered, but its result changes based on the URL query.
export async function getHomePageAndArticlesByQuery(
  query: string
): Promise<{
  homePage: PageItem | null;
  articles: Article[];
}> {
  // If there is no search query, reuse the normal homepage fetch logic.
  // This keeps the default state simple and avoids unnecessary filtering logic.
  if (!query.trim()) {
    return getHomePageAndArticles();
  }

  const data = await hygraph.request<HomePageResponse>(
    GET_HOME_PAGE_AND_FILTERED_ARTICLES,
    { query }
  );

  return {
    homePage: data.pages[0] ?? null,
    articles: data.articles ?? [],
  };
}