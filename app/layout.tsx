import type { Metadata } from "next";
import Link from "next/link";

// This metadata object is used by Next.js for page-level document metadata.
// For now, we keep it simple and define a default title and description.

export const metadata: Metadata = {
  title: "Digital Content Platform",
  description: "A CMS-driven web application built with Next.js and Hygraph.",
};

// The root layout wraps every route inside the app directory.
// This is where we place shared structure like the header, footer,
// and a consistent content container.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#ffffff",
          color: "#111111",
        }}
      >
        {/* 
          This header appears on every page because it lives in the root layout.
          It is a good place for global navigation.
        */}
        <header
          style={{
            borderBottom: "1px solid #e5e5e5",
            padding: "1rem 2rem",
          }}
        >
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#111111",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              DCP
            </Link>

            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/" style={{ textDecoration: "none", color: "#111111" }}>
                Home
              </Link>
            </div>
          </nav>
        </header>

        {/* 
          The main container keeps page content visually consistent.
          Route pages will render inside {children}.
        */}
        <main
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            borderTop: "1px solid #e5e5e5",
            padding: "1rem 2rem",
            color: "#666666",
          }}
        >
          <p style={{ margin: 0 }}>
            Digital Content Platform — internal product in development
          </p>
        </footer>
      </body>
    </html>
  );
}