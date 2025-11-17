"use client"

import { useState } from "react"

export default function ProductCard({ product }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  const selectedVariant = product.variants[selectedColorIndex]
  const price = selectedVariant?.calculated_price?.calculated_amount 
    ? selectedVariant?.calculated_price?.calculated_amount
    : "0.00"

  return (
    <div className="group bg-white border border-[#1921610D] rounded-[12px] overflow-hidden hover:border-[#0A90C812] duration-400 sm:p-[15px] p-[10px]">
      <div className="relative md:h-48 h-32">
        <img 
          src={selectedVariant?.images?.[0]?.url || product.thumbnail || "/placeholder.svg"} 
          alt={product.title} 
          className="w-full h-full object-contain group-hover:scale-[0.95] duration-400" 
        />
      </div>

      <div className="p-4 text-right">
        <a href={`/products/${product.handle}`}>
          <h3 className="text-[16px] font-normal mb-2 line-clamp-2">{product.title}</h3>
        </a>
        <p className="text-[16px] font-semibold text-[#0A90C8] mb-3">
          ₪ {price}
        </p>
        <div className="flex gap-2 justify-end">
          {product.options?.[0]?.values?.map((colorOption, index) => {
            const variant = product.variants.find(v => 
              v.options?.[0]?.value === colorOption.value
            )
            return (
              <button
                key={colorOption.id}
                onClick={() => setSelectedColorIndex(index)}
                className={`w-4 h-4 rounded-full transition border border-[#fff] outline duration-400 cursor-pointer ${
                  selectedColorIndex === index 
                    ? "outline-[#000]" 
                    : "outline-[#fff]"
                }`}
                style={{
                  backgroundColor: variant?.metadata?.color_code || "transparent",
                }}
                aria-label={`Select ${colorOption.value}`}
                title={colorOption.value}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}