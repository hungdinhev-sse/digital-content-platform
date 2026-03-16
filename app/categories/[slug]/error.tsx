"use client";

// Error boundary files in the App Router must be Client Components.
// This one isolates failures inside the category route segment.

type CategoryErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CategoryError({
  error,
  reset,
}: CategoryErrorProps) {
  return (
    <>
      <h1>Something went wrong</h1>
      <p>We could not load this category right now.</p>

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