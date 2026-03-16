import Link from "next/link";

// This file is rendered when notFound() is triggered inside a route.

export default function NotFoundPage() {
  return (
    <>
      <h1>404 - Content not found</h1>
      <p>The page or article you requested does not exist.</p>
      <Link href="/">Back to homepage</Link>
    </>
  );
}