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

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        htmlFor="article-search"
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
      >
        Search articles
      </label>

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
    </div>
  );
}