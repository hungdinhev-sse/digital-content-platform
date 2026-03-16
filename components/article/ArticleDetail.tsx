import type { Article } from "@/types/content";

// This component is responsible only for rendering the article detail UI.
// It does not fetch data by itself.
// That keeps the page route focused on routing and data loading.

type ArticleDetailProps = {
  article: Article;
};

export default function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article>
      <h1>{article.title}</h1>

      <p>
        <strong>Slug:</strong> {article.slug}
      </p>

      <p>{article.excerpt}</p>

      {/* 
        The article body currently comes from Hygraph as HTML.
        We inject it into the page so the CMS-managed rich text can render.
      */}
      <div
        dangerouslySetInnerHTML={{
          __html: article.content?.html || "",
        }}
      />
    </article>
  );
}