import { shopifyFetch } from "./shopify"

export async function getAllProducts() {
  return shopifyFetch({
    query: `{
          products(sortKey: TITLE, first: 100) {
            edges{
              node {
                id
                title
                description
              }
            }
          }
        }`,
  })
}
