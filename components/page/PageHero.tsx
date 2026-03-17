import type { PageItem } from "@/types/content";

// This component is responsible only for rendering homepage hero content.
// It does not fetch data by itself.
// That separation helps keep route files clean and makes the UI reusable.

type PageHeroProps = {
  page: PageItem;
};

export default function PageHero({ page }: PageHeroProps) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h1>{page.title}</h1>

      {/*
        The CMS returns HTML for this field.
        Security note:
        rendering raw HTML is only acceptable if the CMS content is trusted
        or sanitized before delivery, otherwise this can introduce XSS risk.
      */}
      <div
        dangerouslySetInnerHTML={{
          __html: page.content?.html || "",
        }}
      />
    </section>
  );
}