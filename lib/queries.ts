import { gql } from "graphql-request";

// This file stores GraphQL query documents only.

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

export const GET_HOME_PAGE_AND_FILTERED_ARTICLES = gql`
  query GetHomePageAndFilteredArticles($query: String!, $categorySlug: String!) {
    pages(where: { slug: "home" }) {
      title
      slug
      content {
        html
      }
    }
    articles(
      where: {
        AND: [
          {
            OR: [
              { title_contains: $query }
              { excerpt_contains: $query }
            ]
          }
          {
            OR: [
              { category: { slug: $categorySlug } }
              { category: null }
            ]
          }
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

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
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