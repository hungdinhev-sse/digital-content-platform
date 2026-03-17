// Shared content types for the DCP frontend.

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

export type CategoriesResponse = {
  categories: Category[];
};

export type ArticlesByCategorySlugResponse = {
  articles: Article[];
};