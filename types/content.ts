// This file defines the data shapes used by the app.
// Keeping types in one place makes page files easier to read
// and helps you understand what the GraphQL response looks like.

export type RichTextHtml = {
  html?: string;
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
};

export type HomePageResponse = {
  pages: PageItem[];
  articles: Article[];
};

export type ArticleBySlugResponse = {
  articles: Article[];
};