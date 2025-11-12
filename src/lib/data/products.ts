"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
          ...queryParams,
        },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}

export const getHomePageProducts = async () => {
  try {
    const [latestRes, bestSellersRes, newOnTheShelfRes, recommendedLaptopsRes] = await Promise.all([
      sdk.store.product.list({
        limit: 8,
        order: "-created_at",
      }),
      sdk.store.product.list({
        limit: 50,
        order: "-created_at",
        tag_id: "ptag_01K9F18THMNJ0CA27JFRXBSFG9",
        region_id: "reg_01K9ER4AAEJ0133FFBZVS61SFR",
        fields: "*variants.calculated_price,*variants.prices,+variants.inventory_quantity,*variants.images,+metadata,+tags",
      }),
      sdk.store.product.list({
        limit: 50,
        order: "-created_at",
        tag_id: "ptag_01K9F1CP0HJ1DNNEMDA7E0HBSV",
        region_id: "reg_01K9ER4AAEJ0133FFBZVS61SFR",
        fields: "*variants.calculated_price,*variants.prices,+variants.inventory_quantity,*variants.images,+metadata,+tags",
      }),
      sdk.store.product.list({
        limit: 50,
        order: "-created_at",
        tag_id: "ptag_01K9F1DCMF5MZ804M6YZS3RBZH",
        region_id: "reg_01K9ER4AAEJ0133FFBZVS61SFR",
        fields: "*variants.calculated_price,*variants.prices,+variants.inventory_quantity,*variants.images,+metadata,+tags",
      }),
    ])

    return {
      latestProducts: latestRes.products,
      bestSellerProducts: bestSellersRes.products,
      newOnTheShelfProducts: newOnTheShelfRes.products,
      recommendedLaptops: recommendedLaptopsRes.products,
    }
  } catch (err: any) {
    throw new Error(err.message || "Failed to fetch products")
  }
}

// export const storeProductAllFilter = async (limit: number = 100, offset: number = 0) => {
//   try {
//     const filteredProductRes = await sdk.store.product.list({
//       limit: limit,
//       offset: offset,
//       region_id: "reg_01K9ER4AAEJ0133FFBZVS61SFR",
//       fields: "*variants.calculated_price,*variants.prices,+variants.inventory_quantity,*variants.images,+metadata,+tags",
//     })
    
//     return {
//       products: filteredProductRes.products,
//       count: filteredProductRes.count,
//       limit: filteredProductRes.limit,
//       offset: filteredProductRes.offset,
//     }
//   } catch (err: any) {
//     throw new Error(err.message || "Failed to fetch filtered products")
//   }
// }
export const storeProductAllFilter = async (
  limit: number = 100, 
  offset: number = 0,
  filters?: {
    category_id?: string[]
    collection_id?: string[]
    price_min?: number
    price_max?: number
  }
) => {
  try {
    const queryParams: any = {
      limit: limit,
      offset: offset,
      region_id: "reg_01K9ER4AAEJ0133FFBZVS61SFR",
      fields: "*variants.calculated_price,*variants.prices,+variants.inventory_quantity,*variants.images,+metadata,+tags",
    }

    // Add category filter if provided
    if (filters?.category_id && filters.category_id.length > 0) {
      queryParams.category_id = filters.category_id
    }

    // Add collection filter if provided
    if (filters?.collection_id && filters.collection_id.length > 0) {
      queryParams.collection_id = filters.collection_id
    }

    const filteredProductRes = await sdk.store.product.list(queryParams)
    
    return {
      products: filteredProductRes.products,
      count: filteredProductRes.count,
      limit: filteredProductRes.limit,
      offset: filteredProductRes.offset,
    }
  } catch (err: any) {
    throw new Error(err.message || "Failed to fetch filtered products")
  }
}