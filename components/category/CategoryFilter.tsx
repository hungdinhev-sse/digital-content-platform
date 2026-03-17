"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/types/content";

// This is a Client Component because it handles user interaction.
// It updates the URL query string, while the actual data fetching
// still happens in the Server Component page.

type CategoryFilterProps = {
  categories: Category[];
};

export default function CategoryFilter({
  categories,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";

  function handleCategoryChange(nextCategorySlug: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextCategorySlug) {
      params.set("category", nextCategorySlug);
    } else {
      params.delete("category");
    }

    const nextQueryString = params.toString();
    const nextUrl = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;

    router.replace(nextUrl);
  }

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        htmlFor="category-filter"
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
      >
        Filter by category
      </label>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "280px",
          padding: "0.75rem",
          border: "1px solid #d0d0d0",
          borderRadius: "8px",
          fontSize: "1rem",
          backgroundColor: "#ffffff",
        }}
      >
        <option value="">All categories</option>

        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}