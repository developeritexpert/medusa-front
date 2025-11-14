"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="lg:basis-[35%]">
                                <div className=" bg-[#19216108] rounded-[35px] px-[15px] md:px-[25px] py-[40px] sticky top-4">
      <h2 className="text-[18px] md:text-[20px] font-bold mb-6 ">סיכום הזמנה</h2>

      {/* <DiscountCode cart={cart} /> */}
      {/* <Divider /> */}
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="block w-full !text-white text-center bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] font-semibold py-3 px-8 rounded-[76px] mb-4">קופה</Button>
      </LocalizedClientLink>
      <p className="text-center flex items-center justify-center gap-[5px]">
          קופה מאובטחת
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.2688 5.33937H8.78119V3.61535C8.78119 2.85769 8.47097 2.16865 7.97135 1.669C7.47172 1.16937 6.78208 0.859155 6.025 0.859155C5.26734 0.859155 4.5783 1.16937 4.07865 1.669C3.57899 2.16862 3.26822 2.85826 3.26822 3.61535V5.33937H3.2688ZM9.6402 5.34054C10.2935 5.36165 10.8852 5.63727 11.3186 6.07063C11.7701 6.52218 12.0498 7.14495 12.0498 7.82993V12.1671C12.0498 12.8527 11.7695 13.4749 11.3186 13.9264C10.867 14.378 10.2443 14.6577 9.55868 14.6577H2.49116C1.80564 14.6577 1.18287 14.3774 0.731267 13.9264C0.279725 13.4749 0 12.8521 0 12.1671V7.82993C0 7.14441 0.280311 6.52164 0.731267 6.07063C1.16463 5.63727 1.75633 5.36165 2.40965 5.34054V3.61532C2.40965 2.62075 2.81662 1.71701 3.47107 1.06142C4.1261 0.406384 5.0298 0 6.02497 0C7.01954 0 7.92328 0.40697 8.57887 1.06142C9.2339 1.71645 9.64029 2.62015 9.64029 3.61532L9.6402 5.34054Z" fill="black" />
          </svg>
      </p>
    </div>
    </div>
  )
}

export default Summary
