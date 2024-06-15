import { ShopifyResponse } from "@/types/shopify"

export interface ShopifyErrorLike {
  status: number
  message: Error
  cause?: Error
}

export const isObject = (
  object: unknown
): object is Record<string, unknown> => {
  return typeof object === "object" && object !== null && !Array.isArray(object)
}

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
  if (!isObject(error)) return false

  if (error instanceof Error) return true

  return findError(error)
}

function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === "[object Error]") {
    return true
  }

  const prototype = Object.getPrototypeOf(error) as T | null

  return prototype === null ? false : findError(prototype)
}

export const isShopifyResponse = <T>(
  data: unknown
): data is ShopifyResponse<T> => {
  // オブジェクトであるかどうかの基本的なチェック
  if (typeof data !== "object" || data === null) {
    return false
  }

  // body, data, products, edgesの存在チェック
  const hasRequiredStructure =
    "body" in data &&
    "data" in (data as any).body &&
    "products" in (data as any).body.data &&
    "edges" in (data as any).body.data.products

  // edgesが配列であるかどうかのチェック
  if (hasRequiredStructure) {
    const edges = (data as any).body.data.products.edges
    return Array.isArray(edges)
  }

  return false
}
