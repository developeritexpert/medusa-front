"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect, useRef, useTransition } from "react"
import ProductCard from "@modules/layout/components/products/product-card"
import { storeProductAllFilter } from "@lib/data/products"

interface ProductsGridProps {
  initialProducts: any[]
  initialCount: number
  initialPage: number
  initialFilters: {
    categories: string[]
    collections: string[]
    minPrice: number
    maxPrice: number
  }
}

export default function ProductsGrid({ 
  initialProducts, 
  initialCount,
  initialPage,
  initialFilters
}: ProductsGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [products, setProducts] = useState(initialProducts)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalCount, setTotalCount] = useState(initialCount)
  
  // Track current filters from URL
  const [currentFilters, setCurrentFilters] = useState(initialFilters)
  
  // Cache for prefetched data
  const cacheRef = useRef<Map<string, any>>(new Map())
  
  // Track if we're currently fetching to prevent duplicate requests
  const isFetchingRef = useRef(false)
  
  // Track previous search params to detect actual changes
  const prevSearchParamsRef = useRef(searchParams.toString())
  
  const ITEMS_PER_PAGE = 3
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // Create cache key based on page and filters (WITHOUT price filters)
  const getCacheKey = (page: number, filters: typeof currentFilters) => {
    return JSON.stringify({
      page,
      categories: filters.categories.sort(),
      collections: filters.collections.sort(),
    })
  }

  // Initialize cache with initial data
  useEffect(() => {
    const initialKey = getCacheKey(initialPage, initialFilters)
    cacheRef.current.set(initialKey, {
      products: initialProducts,
      count: initialCount
    })
  }, [])

  // Fetch products with filters (NO PRICE FILTERING IN API)
  const fetchProducts = async (page: number, filters: typeof currentFilters) => {
    const offset = (page - 1) * ITEMS_PER_PAGE
    
    const apiFilters: any = {}
    
    if (filters.categories.length > 0) {
      apiFilters.category_id = filters.categories
    }
    
    if (filters.collections.length > 0) {
      apiFilters.collection_id = filters.collections
    }

    const data = await storeProductAllFilter(ITEMS_PER_PAGE, offset, apiFilters)
    return data
  }

  // Apply client-side price filter
  const applyPriceFilter = (products: any[], filters: typeof currentFilters) => {
    if (filters.minPrice === 0 && filters.maxPrice === 10000) {
      return products
    }

    return products.filter(product => {
      const prices = product.variants?.map((variant: any) => {
        const price = variant.calculated_price?.calculated_amount || 
                     variant.prices?.[0]?.amount || 
                     0
        return price / 100
      }) || []
      
      if (prices.length === 0) return true
      
      const minProductPrice = Math.min(...prices)
      
      const matchesMin = filters.minPrice === 0 || minProductPrice >= filters.minPrice
      const matchesMax = filters.maxPrice === 10000 || minProductPrice <= filters.maxPrice
      
      return matchesMin && matchesMax
    })
  }

  // Parse filters from URL whenever it changes
  useEffect(() => {
    // Check if search params actually changed
    const currentSearchParams = searchParams.toString()
    if (currentSearchParams === prevSearchParamsRef.current) {
      return
    }
    prevSearchParamsRef.current = currentSearchParams

    if (isFetchingRef.current) return
    
    const urlFilters = {
      categories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
      collections: searchParams.get('collections')?.split(',').filter(Boolean) || [],
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : 0,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : 10000,
    }
    
    const urlPage = parseInt(searchParams.get('page') || '1')
    
    // Check if category/collection filters changed (these affect API)
    const apiFiltersChanged = 
      JSON.stringify(urlFilters.categories.sort()) !== JSON.stringify(currentFilters.categories.sort()) ||
      JSON.stringify(urlFilters.collections.sort()) !== JSON.stringify(currentFilters.collections.sort())
    
    // Check if only price changed (client-side only)
    const onlyPriceChanged = 
      !apiFiltersChanged &&
      (urlFilters.minPrice !== currentFilters.minPrice || urlFilters.maxPrice !== currentFilters.maxPrice)
    
    const pageChanged = urlPage !== currentPage
    
    // Only fetch if page changed (not filters, as SSR handles filter changes)
    if (pageChanged && !apiFiltersChanged) {
      setCurrentFilters(urlFilters)
      setCurrentPage(urlPage)
      fetchAndUpdateProducts(urlPage, urlFilters)
    } else if (onlyPriceChanged) {
      // Only price changed - apply client-side filter
      setCurrentFilters(urlFilters)
      const filtered = applyPriceFilter(products, urlFilters)
      setProducts(filtered)
    } else if (apiFiltersChanged) {
      // Filters changed - use SSR data, just apply price filter
      setCurrentFilters(urlFilters)
      setCurrentPage(urlPage)
      const filtered = applyPriceFilter(initialProducts, urlFilters)
      setProducts(filtered)
      setTotalCount(initialCount)
    }
  }, [searchParams])

  // Update when initialProducts change (from SSR)
  useEffect(() => {
    const filtered = applyPriceFilter(initialProducts, currentFilters)
    setProducts(filtered)
    setTotalCount(initialCount)
    setCurrentPage(initialPage)
  }, [initialProducts, initialCount, initialPage])

  // Fetch and update products
  const fetchAndUpdateProducts = async (page: number, filters: typeof currentFilters) => {
    const cacheKey = getCacheKey(page, filters)
    
    // Check cache first
    if (cacheRef.current.has(cacheKey)) {
      const cached = cacheRef.current.get(cacheKey)
      const filtered = applyPriceFilter(cached.products, filters)
      setProducts(filtered)
      setTotalCount(cached.count)
      return
    }
    
    if (isFetchingRef.current) return
    
    isFetchingRef.current = true
    setLoading(true)
    
    try {
      const data = await fetchProducts(page, filters)
      
      cacheRef.current.set(cacheKey, {
        products: data.products,
        count: data.count
      })
      
      const filtered = applyPriceFilter(data.products, filters)
      setProducts(filtered)
      setTotalCount(data.count || 0)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }

  // Prefetch adjacent pages
  useEffect(() => {
    const prefetchAdjacentPages = async () => {
      if (loading) return
      
      if (currentPage < totalPages) {
        const nextKey = getCacheKey(currentPage + 1, currentFilters)
        if (!cacheRef.current.has(nextKey)) {
          try {
            const data = await fetchProducts(currentPage + 1, currentFilters)
            cacheRef.current.set(nextKey, {
              products: data.products,
              count: data.count
            })
          } catch (error) {
            // Silent fail
          }
        }
      }

      if (currentPage > 1) {
        const prevKey = getCacheKey(currentPage - 1, currentFilters)
        if (!cacheRef.current.has(prevKey)) {
          try {
            const data = await fetchProducts(currentPage - 1, currentFilters)
            cacheRef.current.set(prevKey, {
              products: data.products,
              count: data.count
            })
          } catch (error) {
            // Silent fail
          }
        }
      }
    }

    const timer = setTimeout(prefetchAdjacentPages, 500)
    return () => clearTimeout(timer)
  }, [currentPage, totalPages, currentFilters, loading])

  // Handle page change
  const handlePageChange = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  // Prefetch on hover
  const handleMouseEnter = (page: number) => {
    const cacheKey = getCacheKey(page, currentFilters)
    if (!cacheRef.current.has(cacheKey) && !loading) {
      fetchProducts(page, currentFilters).then(data => {
        cacheRef.current.set(cacheKey, {
          products: data.products,
          count: data.count
        })
      }).catch(() => {})
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      )}

      <div className="md:basis-[75%] w-full">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">לא נמצאו מוצרים תואמים לסינונים שנבחרו</p>
            </div>
          )}
        </div>

        {totalPages > 1 && products.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  onMouseEnter={() => handleMouseEnter(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  קודם
                </button>

                <div className="flex gap-2 flex-wrap justify-center">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page: number;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        onMouseEnter={() => handleMouseEnter(page)}
                        disabled={loading}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 hover:bg-gray-100"
                        } disabled:opacity-50`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  onMouseEnter={() => handleMouseEnter(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  הבא
                </button>
              </div>

              <div className="text-center text-gray-600">
                עמוד {currentPage} מתוך {totalPages} ({totalCount} מוצרים)
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}