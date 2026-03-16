import Link from "next/link";
import type { Category } from "@/types/content";

// This component renders a category as a small reusable navigation link.
// Keeping it separate lets us reuse the same category UI in cards,
// detail pages, and category landing pages.

type CategoryLinkProps = {
  category: Category;
};

export default function CategoryLink({ category }: CategoryLinkProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      style={{
        display: "inline-block",
        marginTop: "0.5rem",
        textDecoration: "none",
        color: "#0a66c2",
        fontWeight: 500,
      }}
    >
      {category.name}
    </Link>
  );
}