import { Metadata } from "next"
import Image from "next/image"
import Banner from "@modules/layout/components/sliders/banner"
import ModelSlider from "@modules/layout/components/sliders/model-slider"
import LogoSlider from "@modules/layout/components/sliders/logos-slider"
import ProductCarousel from "@modules/layout/components/products/product-carousel"
import BlogSection from "@modules/layout/components/blogs/blogs"
import { listRegions, getRegion } from "@lib/data/regions"
import { listCollections } from "@lib/data/collections"
import { getHomePageProducts } from "@lib/data/products"
import { getPublishedPosts } from "@lib/data/blog"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description: "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home() {
  try {
    // Fetch all data
    const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "il"
    const region = await getRegion(DEFAULT_REGION)
    
    const { collections } = await listCollections({
      fields: "id, handle, title",
    })
    
    if (!collections) {
      console.log("No collections found")
      return <div>Error: No collections found</div>
    }

    const { latestProducts, bestSellerProducts, newOnTheShelfProducts, recommendedLaptops } = await getHomePageProducts()
    
    // Fetch blog posts
    const blogPosts = await getPublishedPosts()
    console.log("📝 Blog posts loaded:", blogPosts.length, "posts")
  
    return (
      <>
        <section className="px-[20px] md:px-[30px] lg:px-[50px] md:py-[50px]">
          <div className="mx-auto max-w-[1500px]">
            <Banner title="Welcome" category="homepage" />
          </div>
        </section>

        <section className="px-[20px] md:px-[30px] lg:px-[50px] md:py-[50px] pt-[50px]">
          <div className="mx-auto max-w-[1200px]">
            <ModelSlider products={latestProducts}/>
          </div>
        </section>

        <section className="px-[20px] md:px-[30px] lg:px-[50px] py-[50px]">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex md:flex-row flex-col gap-[20px]">
              <div className="flex items-end md:p-[20px] p-[20px] pt-[140px] bg-[url('/img/secbg1.png')] bg-cover bg-center h-[350px] rounded-[20px] basis-[50%]">
                <h3 className="text-[#fff] md:text-[24px] text-[20px] font-bold text-center mx-auto max-w-[250px]">חסכו יותר עם ייבוא ישיר מהמפעל.</h3>
              </div>
              <div className="flex items-end md:p-[20px] p-[20px] pt-[140px] bg-[url('/img/secbg2.png')] bg-cover bg-center h-[350px] rounded-[20px] basis-[50%]">
                <h3 className="text-[#fff] md:text-[24px] text-[20px] font-bold text-center mx-auto max-w-[250px]">מחשבים איכותיים – בלי המחיר המופרז.</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="px-[10px] md:px-[30px] lg:px-[50px] md:py-[50px]">
          <div className="mx-auto max-w-[1200px]">
            <ProductCarousel title="רבי מכר" category="Best Sellers" products={bestSellerProducts} />
          </div>
        </section>

        <section className="px-[20px] md:px-[30px] lg:px-[50px] py-[50px]">
          <div className="bg-[#19216108] p-[20px] md:p-[30px] lg:p-[50px] rounded-[25px]">
            <div className="mx-auto max-w-[1200px]">
              <ProductCarousel title="חדש על המדף" category="New Arrivals" products={newOnTheShelfProducts} />
            </div>
          </div>
        </section>

        <section className="lg:px-[50px] md:px-[30px] px-[20px]">
          <div className="p-[20px] md:p-[30px] lg:p-[50px] rounded-[35px] md:h-[500px] h-[300px] flex items-end bg-[url('/img/mid-bg.png')] bg-cover bg-center">
            <div className="mx-auto max-w-[1200px] w-full">
              <h3 className="text-[25px] md:text-[35px] lg:text-[50px] font-bold text-[#fff]">
                יבואן מורשה של
                <br /><span className="text-[#3EE8F0]">מותגי המחשבים</span>
                <br /> המובילים.
              </h3>
            </div>
          </div>
        </section>

        <section className="px-[20px] md:px-[30px] lg:px-[50px] py-[50px]">
          <div className="mx-auto max-w-[1200px]">
            <ProductCarousel title="מחשבים ניידים מומלצים" category="Laptops" products={recommendedLaptops} />
          </div>
        </section>

        <section className="px-[20px] md:px-[30px] lg:px-[50px] md:py-[50px]">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex md:flex-row flex-col gap-[20px]">
              <div className="basis-[50%]">
                <Image src="/img/bgg1.png" alt="Logo" height={800} width={800} className="w-full" />
              </div>
              <div className="basis-[50%]">
                <Image src="/img/bgg2.png" alt="Logo" height={800} width={800} className="w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-[20px] md:px-[30px] lg:px-[50px] md:py-[50px] pb-[10px] pt-[60px]">
          <div className="mx-auto max-w-[1200px]">
            <LogoSlider title="מותגי המחשבים המובילים" category="computer_brands" />
          </div>
        </section>

        {/* Blog Section - Replaces your hardcoded one */}
        <BlogSection posts={blogPosts} />
      </>
    )
  } catch (error) {
    console.error("Error in Home page:", error)
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Error loading page</h2>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
        <details>
          <summary>Full error:</summary>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </details>
      </div>
    )
  }
}