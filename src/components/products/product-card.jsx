"use client"

import { useState } from "react"

export default function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(0)

  const colorMap = {
    black: "bg-black",
    silver: "bg-[#AEB6C1]",
    yellow: "bg-[#EAD429]"
  }

  return (
    <div className="group bg-white border border-[#1921610D] rounded-[12px] overflow-hidden hover:border-[#0A90C812] duration-400 sm:p-[15px] p-[10px]">
      <div className="relative md:h-48 h-32">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-contain group-hover:scale-[0.95] duration-400" />
      </div>

      <div className="p-4 text-right">
        <h3 className="text-[16px] font-normal mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-[16px] font-semibold text-[#0A90C8] mb-3">₪ {product.price}</p>

        <div className="flex gap-2 justify-end">
          {product.colors.map((color, index) => (
            <button
              key={color}
              onClick={() => setSelectedColor(index)}
              className={`w-4 h-4 rounded-full transition border border-[#fff] outline duration-400 cursor-pointer ${
                selectedColor === index ? "outline-[#000]" : "outline-[#fff]"
              } ${colorMap[color]}`}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
