import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
// import StoreTemplate from "@modules/store/templates"
import ProductCard from "@modules/layout/components/products/product-card";
import ShopFilters from "@modules/layout/components/shopfilter/ShopFilters";
import { storeProductAllFilter } from "@lib/data/products"
import ProductsGrid from "@modules/layout/components/products/ProductsGrid"
import { off } from "process";
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
    category?: string
    collection?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams
  const currentPage = parseInt(searchParams.page || "1")
  const ITEMS_PER_PAGE = 3
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  const productsData = await storeProductAllFilter(ITEMS_PER_PAGE, offset)
  const categoriesData = await listCategories();
  const collectionsData = await listCollections();

  return (
    // <StoreTemplate
    //   sortBy={sortBy}
    //   page={page}
    //   countryCode={params.countryCode}
    // />
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
                />
                <div className="md:basis-[25%]">
                    <ShopFilters categories={categoriesData} collections={collectionsData} />
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
