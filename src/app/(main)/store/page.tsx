import { Metadata } from "next"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import ProductCard from "@modules/layout/components/products/product-card";
import ShopFilters from "@modules/layout/components/shopfilter/ShopFilters";
import { storeProductAllFilter } from "@lib/data/products"
import ProductsGrid from "@modules/layout/components/products/ProductsGrid"
import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    categories?: string  // Added: comma-separated category IDs
    collections?: string // Added: comma-separated collection IDs
    minPrice?: string    // Added: minimum price
    maxPrice?: string    // Added: maximum price
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const currentPage = parseInt(searchParams.page || "1")
  const ITEMS_PER_PAGE = 3
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  
  // Parse filters from URL
  const filters: any = {}
  
  if (searchParams.categories) {
    filters.category_id = searchParams.categories.split(',').filter(Boolean)
  }
  
  if (searchParams.collections) {
    filters.collection_id = searchParams.collections.split(',').filter(Boolean)
  }
  
  if (searchParams.minPrice) {
    filters.price_min = parseFloat(searchParams.minPrice)
  }
  
  if (searchParams.maxPrice) {
    filters.price_max = parseFloat(searchParams.maxPrice)
  }
  
  // Fetch products with filters applied
  const productsData = await storeProductAllFilter(ITEMS_PER_PAGE, offset, filters)
  const categoriesData = await listCategories();
  const collectionsData = await listCollections();

  // Parse initial filter state from URL for ShopFilters
  const initialFilters = {
    categories: searchParams.categories?.split(',').filter(Boolean) || [],
    collections: searchParams.collections?.split(',').filter(Boolean) || [],
    minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : 0,
    maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : 10000,
  }

  return (
    <>
       <section className="px-[20px] md:px-[30px] lg:px-[50px] pb-[50px] pt-[20px] md:pt-[40px]">
                <div className="mx-auto max-w-[1600px]">
                    <div className="bg-[url('/img/banner2.png')] bg-cover bg-center rounded-[30px] px-[20px] py-[120px] md:px-[30px] lg:px-[50px]">
                        <h1 className="text-center text-[#00215E] text-[35px] md:text-[50px] font-bold">
                            יבואן מְכִירָה
                        </h1>
                        <p className="text-center mx-auto max-w-[500px] font-semibold mt-[10px]">
                            גלו מבצעים מדהימים על מחשבים ניידים, נייחים ועוד – רק אצל יבואן
                            המחשבים. טכנולוגיה איכותית, במחירים משתלמים במיוחד.
                        </p>
                    </div>
                </div>
            </section>
      
      <section className="px-[20px] md:px-[30px] lg:px-[50px] pb-[50px]"> 
        <div className="mx-auto max-w-[1400px]">
          <div className="flex md:flex-row-reverse flex-col gap-[30px]">
            <ProductsGrid
              initialProducts={productsData.products}
              initialCount={productsData.count || 0}
              initialPage={currentPage}
              initialFilters={initialFilters}
            />
            <div className="md:basis-[25%]">
              <ShopFilters 
                categories={categoriesData} 
                collections={collectionsData}
                initialFilters={initialFilters}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}