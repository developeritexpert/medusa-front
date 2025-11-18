import React, { Suspense } from "react"
import ProductActions from "@modules/products/components/product-actions-new"
import ProductActionsWrapper from "../product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const ProductInfo = ({ product , region}: ProductInfoProps) => {
  return (
   
    <div id="product-info">
      <div className="space-y-6">
          <div className="">
              <h1 className="text-[20px] mb-[20px] md:text-[25px] md:text-[30px] font-semibold leading-tight max-w-[300px]">
                  {product.title}
              </h1>
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
              {/* <div className="flex items-center justify-between gap-[30px]">
                  <div className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse mb-4">
                      <span className="text-3xl font-bold text-[#0A90C8]">{ramOptions[selectedRam].price} ₪</span>
                      <span className="text-lg font-semibold text-[#919191] line-through">{ramOptions[selectedRam].originalPrice} ₪</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 mx-[5px] inline-block rounded-full text-sm font-semibold">
                          {Math.round((1 - parseInt(ramOptions[selectedRam].price.replace(',', '')) / parseInt(ramOptions[selectedRam].originalPrice.replace(',', ''))) * 100)}% הנחה
                      </span>
                  </div>
                  <Image src="/icons/info.png" alt="Info" width={80} height={80} className="w-[18px] mb-4" />
              </div> */}

          </div>
          {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
        </div>




      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
