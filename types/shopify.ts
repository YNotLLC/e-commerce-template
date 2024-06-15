export type ShopifyResponse<T> = {
  body: {
    data: {
      products: {
        edges: {
          node: T
        }[]
      }
    }
  }
}
