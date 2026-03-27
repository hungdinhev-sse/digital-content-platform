import { hygraph } from "@/lib/hygraph";
import {
  GET_ARTICLE_BY_SLUG,
  GET_ARTICLE_SLUGS,
  GET_ARTICLES_BY_CATEGORY_SLUG,
  GET_CATEGORIES,
  GET_CATEGORY_BY_SLUG,
  GET_CATEGORY_SLUGS,
  GET_HOME_PAGE_AND_ARTICLES,
} from "@/lib/queries";
import type {
  Article,
  ArticleBySlugResponse,
  ArticleSlugsResponse,
  ArticlesByCategorySlugResponse,
  CategoriesResponse,
  Category,
  CategoryBySlugResponse,
  CategorySlugsResponse,
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

export async function getHomePageAndArticlesByFilters(
  query: string,
  categorySlug: string
): Promise<{
  homePage: PageItem | null;
  articles: Article[];
}> {
  const { homePage, articles } = await getHomePageAndArticles();

  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCategorySlug = categorySlug.trim().toLowerCase();

  const filteredArticles = articles.filter((article) => {
    const matchesQuery =
      !normalizedQuery ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.excerpt.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      !normalizedCategorySlug ||
      article.category?.slug?.toLowerCase() === normalizedCategorySlug;

    return matchesQuery && matchesCategory;
  });

  return {
    homePage,
    articles: filteredArticles,
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

export async function getArticleSlugs(): Promise<string[]> {
  const data = await hygraph.request<ArticleSlugsResponse>(GET_ARTICLE_SLUGS);
  return (data.articles ?? []).map((article) => article.slug);
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

export async function getCategories(): Promise<Category[]> {
  const data = await hygraph.request<CategoriesResponse>(GET_CATEGORIES);
  return data.categories ?? [];
}

export async function getCategorySlugs(): Promise<string[]> {
  const data = await hygraph.request<CategorySlugsResponse>(GET_CATEGORY_SLUGS);
  return (data.categories ?? []).map((category) => category.slug);
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