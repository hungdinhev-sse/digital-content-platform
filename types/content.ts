// This file defines the shared data shapes used across the app.
// We are extending the content model with Category so the frontend
// can render relationship-driven navigation, not just a flat article list.

export type RichTextHtml = {
  html?: string;
};

export type Category = {
  name: string;
  slug: string;
};

export type PageItem = {
  title: string;
  slug: string;
  content?: RichTextHtml;
};

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  content?: RichTextHtml;
  category?: Category | null;
};

export type HomePageResponse = {
  pages: PageItem[];
  articles: Article[];
};

export type ArticleBySlugResponse = {
  articles: Article[];
};

export type CategoryBySlugResponse = {
  categories: Category[];
};

export type ArticlesByCategorySlugResponse = {
  articles: Article[];
};