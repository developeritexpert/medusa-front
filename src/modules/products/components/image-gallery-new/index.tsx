import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images, product }: ImageGalleryProps & { product: HttpTypes.StoreProduct }) => {
  return (
    
    
      <div>
        <div className="space-y-4 sticky top-[30px]">
          <div className="bg-[#19216103] rounded-[24px] border border-[#1921610D] p-[20px] md:p-[40px] relative overflow-hidden">
              <div className="relative w-full h-60 md:h-96 cursor-zoom-in">
                  {product.thumbnail && product.thumbnail.length > 0 && (
                      <Image
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-contain"
                          height={700}
                          width={700}
                      />
                  )}
              </div>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 ">
                {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
                  {images?.length > 1 && images.slice(1).map((image, index) => (
                      <div
                          key={image.id || index}
                          className="relative flex items-center justify-center bg-[#19216103] cursor-zoom-in rounded-lg hover:border-[#192161] border border-[#1921610D] p-2 transition-colors duration-200"
                      >
                          <Image
                              src={image.url}
                              alt={`${product.title} - View ${index + 2}`}
                              height={200}
                              width={200}
                              className="h-28 md:h-36 w-28 md:w-36 object-contain"
                          />

                          <button
                              className="absolute right-[10px] top-[10px] border-[#1921610D] border rounded-full duration-300 p-1 cursor-pointer"
                          >
                              <Image
                                  src="/icons/enlarge.png"
                                  alt="Enlarge"
                                  width={12}
                                  height={12}
                                  className="w-[12px]"
                              />
                          </button>
                      </div>
                  ))}

              </div>
          </div>
        </div>
      </div>
      
  )
}

export default ImageGallery
