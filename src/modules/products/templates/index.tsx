import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ImageGalleryNew from "@modules/products/components/image-gallery-new"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import ProductInfoNew from "@modules/products/templates/product-info-new"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import Breadcrumb from "@modules/layout/components/breadcrumb/breadcrumb";

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const breadcrumbItems: Array<{ label: string; href: string }> = [
        { label: "יבואן מְכִירָה", href: "/store" },
        { label: "מחשבים ניידים", href: "" },
        { label: product.title, href: "" },
    ]

  return (
    <>
    <div className="max-w-[1400px] mx-auto">
        <Breadcrumb items={breadcrumbItems} className="mb-[20px]" />
    </div>
    <div className="min-h-screen md:mt-[20px]">
        <div className="max-w-[1400px] mx-auto px-[20px] md:px-[30px] lg:px-[50px] lg:py-8 pt-0 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ImageGalleryNew images={images}  product={product} />
            <ProductInfoNew product={product} region={region} />
          </div>
            
          {/* <div className="bg-white mb-8">
              <h2 className="font-semibold text-center mt-[100px] text-[20px] md:text-[30px]">לגבי פריט זה</h2>
              <div className="md:p-6 py-6 px-3"></div>
          </div> */}
          

        </div>
    </div>
                
      {/* <div
        className="content-container  flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="block w-full relative">
          <ImageGallery images={images} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div> */}
    </>
  )
}

export default ProductTemplate
