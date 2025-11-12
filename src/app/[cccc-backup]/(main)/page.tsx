import { Metadata } from "next"
import Image from "next/image"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Banner from "@modules/layout/components/sliders/banner";
import ModelSlider from "@modules/layout/components/sliders/model-slider";
import LogoSlider from "@modules/layout/components/sliders/logos-slider";
import ProductCarousel from "@modules/layout/components/products/product-carousel";
import { getHomePageProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  const { latestProducts, bestSellerProducts, newOnTheShelfProducts, recommendedLaptops } = await getHomePageProducts()

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
                  <div className="flex items-end md:p-[20px] px-[20px] py-[70px] bg-[url('/img/secbg1.png')] bg-cover bg-center h-[350px] rounded-[20px] basis-[50%]">
                    <h3 className="text-[#fff] md:text-[24px] text-[20px] font-bold text-center mx-auto max-w-[250px]">חסכו יותר עם ייבוא ישיר מהמפעל.</h3>
                  </div>
                  <div className="flex items-end md:p-[20px] px-[20px] py-[70px] bg-[url('/img/secbg2.png')] bg-cover bg-center h-[350px] rounded-[20px] basis-[50%]">
                    <h3 className="text-[#fff] md:text-[24px] text-[20px] font-bold text-center mx-auto max-w-[250px]">מחשבים איכותיים – בלי המחיר המופרז.</h3>
                  </div>
                </div>
              </div>
            </section>
            <section className="px-[20px] md:px-[30px] lg:px-[50px] md:py-[50px]">
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
              <div className="p-[20px] md:p-[30px] lg:p-[50px] rounded-[35px] md:h-[500px] h-[300px] flex items-end  bg-[url('/img/mid-bg.png')] bg-cover bg-center">
                <div className="mx-auto max-w-[1200px] w-full">
                  <h3 className="text-[25px] md:text-[35px] lg:text-[50px] font-bold text-[#fff]">יבואן מורשה של
                    <br /><span className="text-[#3EE8F0]">מותגי המחשבים</span>
                    <br /> המובילים.</h3>
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
    </>
  )
}
