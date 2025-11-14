import { Metadata } from "next"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import ProductTemplate from "@modules/products/templates"

type Props = {
  params: Promise<{ handle: string }>
  searchParams: Promise<{ variant?: string }>
}

const DEFAULT_REGION_ID = process.env.NEXT_PUBLIC_DEFAULT_REGION_ID || "reg_01K9ER4AAEJ0133FFBZVS61SFR"

export async function generateStaticParams() {
  try {
    const { response } = await listProducts({
      regionId: DEFAULT_REGION_ID,
      queryParams: { limit: 100, fields: "handle" },
    })

    return response.products
      .map((product) => ({
        handle: product.handle,
      }))
      .filter((param) => param.handle)
  } catch (error) {
    console.error("Failed to generate static params:", error)
    return []
  }
}

function getVariantImages(
  product: HttpTypes.StoreProduct,
  variantId?: string
): HttpTypes.StoreProductImage[] {
  if (!variantId || !product.variants?.length || !product.images) {
    return product.images || []
  }

  const variant = product.variants.find((v) => v.id === variantId)
  
  if (variant?.images?.length) {
    return variant.images
  }

  return product.images
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const params = await props.params

    const { response } = await listProducts({
      regionId: DEFAULT_REGION_ID,
      queryParams: { 
        handle: params.handle,
        limit: 1 
      },
    })

    const product = response?.products?.[0]

    if (!product) {
      return {
        title: "Product Not Found",
      }
    }

    const image = product.thumbnail || product.images?.[0]?.url

    return {
      title: `${product.title} | Medusa Store`,
      description: product.description || `Buy ${product.title}`,
      openGraph: {
        title: product.title,
        description: product.description || `Buy ${product.title}`,
        images: image ? [{ url: image }] : [],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Product Not Found",
    }
  }
}

export default async function ProductPage(props: Props) {
  try {
    const params = await props.params
    const searchParams = await props.searchParams

    const { response } = await listProducts({
      regionId: DEFAULT_REGION_ID,
      queryParams: { 
        handle: params.handle,
        limit: 1 
      },
    })

    const product = response?.products?.[0]

    if (!product) {
      notFound()
    }

    const selectedVariantId = searchParams.variant
    const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId) || product.variants?.[0]
    
    const images = getVariantImages(product, selectedVariant?.id)

    return (
      <ProductTemplate
        product={product}
        images={images}
      />
    )
  } catch (error) {
    console.error("Error loading product page:", error)
    notFound()
  }
}