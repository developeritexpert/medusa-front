import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  // TODO: Fix image typings
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
      <ImageOrPlaceholder image={initialImage} size={size} />
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <img
              src={image}
              alt="Thumbnail"
              className="w-full h-full object-contain"
          />
  ) : (
    <div className="w-full h-full object-contain">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
