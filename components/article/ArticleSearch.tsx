"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// This is a Client Component because it handles browser interaction.
// We keep the input responsive locally, then debounce URL updates
// so the app does not re-trigger navigation on every single keystroke.

export default function ArticleSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local input state updates immediately as the user types.
  const [value, setValue] = useState(searchParams.get("query") ?? "");

  const selectedCategory = searchParams.get("category") ?? "";

  // Keep input state aligned when the URL changes from navigation.
  useEffect(() => {
    setValue(searchParams.get("query") ?? "");
  }, [searchParams]);

  // Debounce the URL update so we do not trigger route updates
  // on every keystroke. This improves UX and reduces unnecessary work.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentQuery = searchParams.get("query") ?? "";
      const trimmedValue = value.trim();

      // If the URL already matches the current input, do nothing.
      // This avoids unnecessary replace() calls.
      if (trimmedValue === currentQuery) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (trimmedValue) {
        params.set("query", trimmedValue);
      } else {
        params.delete("query");
      }

      const nextQueryString = params.toString();
      const nextUrl = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;

      router.replace(nextUrl);
    }, 300);

    // Cleanup runs when value changes again before 300ms.
    // This is what makes the effect behave like a debounce.
    return () => clearTimeout(timeoutId);
  }, [value, pathname, router, searchParams]);

  function handleClearSearch() {
    // Clear only the search query, but keep any other filters like category.
    setValue("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");

    const nextQueryString = params.toString();
    const nextUrl = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;

    router.replace(nextUrl);
  }

  function handleClearAllFilters() {
    // Reset all homepage filter state at once.
    // This returns the page to its default URL and default data state.
    setValue("");
    router.replace(pathname);
  }

  const hasSearch = value.trim().length > 0;
  const hasAnyFilter = hasSearch || selectedCategory.length > 0;

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        htmlFor="article-search"
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
      >
        Search articles
      </label>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          id="article-search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by title or excerpt"
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "0.75rem",
            border: "1px solid #d0d0d0",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />

        {/* 
          Clear removes only the search query and keeps other filters intact.
        */}
        {hasSearch && (
          <button
            type="button"
            onClick={handleClearSearch}
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
          >
            Clear search
          </button>
        )}

        {/* 
          Clear all resets both query and category filter by returning
          the route to its base pathname with no search params.
        */}
        {hasAnyFilter && (
          <button
            type="button"
            onClick={handleClearAllFilters}
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              backgroundColor: "#f7f7f7",
              cursor: "pointer",
            }}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}