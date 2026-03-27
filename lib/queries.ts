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

export const GET_ARTICLE_SLUGS = gql`
  query GetArticleSlugs {
    articles {
      slug
    }
  }
`;

export const GET_CATEGORY_SLUGS = gql`
  query GetCategorySlugs {
    categories {
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