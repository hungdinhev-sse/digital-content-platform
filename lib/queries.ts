import { gql } from "graphql-request";

// This file stores GraphQL query documents only.
// The goal is to keep page components focused on rendering,
// not on holding long query strings.

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
    }
  }
`;