"use client";

// This error boundary catches errors inside the article route segment.

type ArticleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ArticleError({
  error,
  reset,
}: ArticleErrorProps) {
  return (
    <>
      <h1>Something went wrong</h1>
      <p>We could not load this article right now.</p>

      <pre
        style={{
          background: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        {error.message}
      </pre>

      <button
        onClick={() => reset()}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </>
  );
}