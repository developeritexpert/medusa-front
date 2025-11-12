"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import ProductCard from "@modules/layout/components/products/product-card"
import { storeProductAllFilter } from "@lib/data/products"

interface ProductsGridProps {
  initialProducts: any[]
  initialCount: number
  initialPage: number
  filters?: any // Add filters prop
  onFiltersUpdate?: (filters: any) => void // Add callback
}

export default function ProductsGrid({ 
  initialProducts, 
  initialCount,
  initialPage,
  filters,
  onFiltersUpdate
}: ProductsGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [products, setProducts] = useState(initialProducts)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalCount, setTotalCount] = useState(initialCount)
  
  // Cache for prefetched data - now includes filter key
  const cacheRef = useRef<Map<string, any>>(new Map())
  
  const ITEMS_PER_PAGE = 3
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // Create cache key based on page and filters
  const getCacheKey = (page: number, filterParams: any = filters) => {
    return `${page}-${JSON.stringify(filterParams || {})}`
  }

  // Initialize cache with initial data
  useEffect(() => {
    cacheRef.current.set(getCacheKey(initialPage), initialProducts)
  }, [initialPage, initialProducts])

  // Fetch products with filters
  const fetchProducts = async (page: number, filterParams: any = filters) => {
    const offset = (page - 1) * ITEMS_PER_PAGE
    
    const apiFilters: any = {}
    
    if (filterParams?.categories && filterParams.categories.length > 0) {
      apiFilters.category_id = filterParams.categories
    }
    
    if (filterParams?.collections && filterParams.collections.length > 0) {
      apiFilters.collection_id = filterParams.collections
    }
    
    if (filterParams?.minPrice && filterParams.minPrice > 0) {
      apiFilters.price_min = filterParams.minPrice
    }
    
    if (filterParams?.maxPrice) {
      apiFilters.price_max = filterParams.maxPrice
    }

    const data = await storeProductAllFilter(ITEMS_PER_PAGE, offset, apiFilters)
    return data
  }

  // Handle filter changes
  useEffect(() => {
    if (!filters) return

    const applyFilters = async () => {
      setLoading(true)
      setCurrentPage(1) // Reset to first page when filters change
      
      try {
        const data = await fetchProducts(1, filters)
        
        // Clear cache when filters change
        cacheRef.current.clear()
        cacheRef.current.set(getCacheKey(1, filters), data.products)
        
        setProducts(data.products)
        setTotalCount(data.count || 0)
        
        // Update URL with filters
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', '1')
        
        if (filters.categories?.length > 0) {
          params.set('categories', filters.categories.join(','))
        } else {
          params.delete('categories')
        }
        
        if (filters.collections?.length > 0) {
          params.set('collections', filters.collections.join(','))
        } else {
          params.delete('collections')
        }
        
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      } catch (error) {
        console.error("Error applying filters:", error)
      } finally {
        setLoading(false)
      }
    }

    applyFilters()
  }, [filters])

  // Prefetch adjacent pages with current filters
  useEffect(() => {
    const prefetchAdjacentPages = async () => {
      // Prefetch next page
      if (currentPage < totalPages && !cacheRef.current.has(getCacheKey(currentPage + 1))) {
        try {
          const data = await fetchProducts(currentPage + 1, filters)
          cacheRef.current.set(getCacheKey(currentPage + 1, filters), data.products)
        } catch (error) {
          console.error("Error prefetching next page:", error)
        }
      }

      // Prefetch previous page
      if (currentPage > 1 && !cacheRef.current.has(getCacheKey(currentPage - 1))) {
        try {
          const data = await fetchProducts(currentPage - 1, filters)
          cacheRef.current.set(getCacheKey(currentPage - 1, filters), data.products)
        } catch (error) {
          console.error("Error prefetching previous page:", error)
        }
      }
    }

    const timer = setTimeout(prefetchAdjacentPages, 100)
    return () => clearTimeout(timer)
  }, [currentPage, totalPages, filters])

  // Handle page change with cache
  const handlePageChange = async (page: number) => {
    setCurrentPage(page)
    
    const cacheKey = getCacheKey(page, filters)
    
    // Check if page is already cached
    if (cacheRef.current.has(cacheKey)) {
      // INSTANT! Use cached data
      setProducts(cacheRef.current.get(cacheKey))
      
      // Update URL
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Not cached, fetch it
      setLoading(true)
      
      try {
        const data = await fetchProducts(page, filters)
        
        // Cache it for future
        cacheRef.current.set(cacheKey, data.products)
        setProducts(data.products)
        
        // Update URL
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
        
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  // Prefetch on hover (optional - even faster!)
  const handleMouseEnter = (page: number) => {
    const cacheKey = getCacheKey(page, filters)
    if (!cacheRef.current.has(cacheKey)) {
      fetchProducts(page, filters).then(data => {
        cacheRef.current.set(cacheKey, data.products)
      }).catch(console.error)
    }
  }

  // ... rest of your existing JSX remains the same
  
  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="md:basis-[75%] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
          {products.map((product) => (
              <div key={product.id}>
                  <ProductCard product={product} />
              </div>
          ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                onMouseEnter={() => handleMouseEnter(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                קודם
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    onMouseEnter={() => handleMouseEnter(page)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                onMouseEnter={() => handleMouseEnter(currentPage + 1)}
                disabled={currentPage === totalPages}
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
    </>
  )
}