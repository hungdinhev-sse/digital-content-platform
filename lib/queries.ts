import { gql } from "graphql-request";

// This file stores GraphQL query documents only.
// We now include the category relation in article queries
// so the UI can link articles to taxonomy pages.

export const GET_HOME_PAGE_AND_ARTICLES = gql`
  query GetHomePageAndArticles {
    pages(where: { slug: "home" }) {
      title
      slug
      content {
        html
      }
    }
    articles {
      title
      slug
      excerpt
      category {
        name
        slug
      }
    }
  }
`;

export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    articles(where: { slug: $slug }) {
      title
      slug
      excerpt
      content {
        html
      }
      category {
        name
        slug
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: String!) {
    categories(where: { slug: $slug }) {
      name
      slug
    }
  }
`;

export const GET_ARTICLES_BY_CATEGORY_SLUG = gql`
  query GetArticlesByCategorySlug($slug: String!) {
    articles(where: { category: { slug: $slug } }) {
      title
      slug
      excerpt
      category {
        name
        slug
      }
    }
  }
`;

// This query fetches homepage content and filters articles by a search query.
// We keep the homepage page content fixed, and let the article list respond
// to the incoming search string from the URL.
export const GET_HOME_PAGE_AND_FILTERED_ARTICLES = gql`
  query GetHomePageAndFilteredArticles($query: String!) {
    pages(where: { slug: "home" }) {
      title
      slug
      content {
        html
      }
    }
    articles(
      where: {
        OR: [
          { title_contains: $query }
          { excerpt_contains: $query }
        ]
      }
    ) {
      title
      slug
      excerpt
      category {
        name
        slug
      }
    }
  }
`;