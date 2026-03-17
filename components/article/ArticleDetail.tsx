import type { Article } from "@/types/content";
import CategoryLink from "@/components/category/CategoryLink";

// This component renders the article detail UI.
// We include category navigation so the detail page can link back
// into taxonomy-driven browsing.

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

      {article.category && (
        <p>
          <strong>Category:</strong> <CategoryLink category={article.category} />
        </p>
      )}

      <p>{article.excerpt}</p>

       {/*
        The article body currently comes from Hygraph as HTML.
        Security note:
        this assumes the HTML is trusted or sanitized before rendering.
        Raw HTML rendering can be risky if untrusted content is allowed.
      */}
      <div
        dangerouslySetInnerHTML={{
          __html: article.content?.html || "",
        }}
      />
    </article>
  );
}