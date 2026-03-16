import { hygraph } from "@/lib/hygraph";
import {
  GET_ARTICLE_BY_SLUG,
  GET_HOME_PAGE_AND_ARTICLES,
} from "@/lib/queries";
import type {
  Article,
  ArticleBySlugResponse,
  HomePageResponse,
  PageItem,
} from "@/types/content";

// This file is the content data access layer.
// Pages call these functions instead of talking to Hygraph directly.
// That separation is important because it keeps route files simpler
// and makes later refactors much easier.

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