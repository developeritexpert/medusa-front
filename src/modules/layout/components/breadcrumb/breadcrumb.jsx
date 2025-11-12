"use client"

import Link from "next/link"
import clsx from "clsx"
import Image from "next/image"

export default function Breadcrumb({ items = [], className = "" }) {
  return (
    <section className="max-w-[1200px] mx-auto">
            <nav
      className={clsx("flex items-center text-sm text-[#919191] py-4", className)}
      aria-label="breadcrumb"
    >
      <Link href="/" className="flex items-center text-[#919191] hover:text-[#0A90C8]">
        <Image src="/icons/home.png" alt="Home" width={50} height={50} className="max-w-[15px] max-h-[15px] object-contain" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span className="mx-2 text-[#919191] hover:!text-[#000] duration-300">{`‹`}</span>
          {item.href ? (
            <Link
              href={item.href}
              className={clsx(
                "hover:!text-[#0A90C8]",
                index === items.length - 1 ? "text-gray-800 font-medium " : "text-gray-500"
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#919191] hover:!text-[#000] duration-300 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
    </section>
    
  )
}
