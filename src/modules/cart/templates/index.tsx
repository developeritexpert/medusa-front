import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <section className="px-[20px] md:px-[30px] lg:px-[50px] pb-[50px]">
      {!customer && (
        <>
          <SignInPrompt />
          <Divider />
        </>
      )}
        <div className="mx-auto max-w-[1400px]">
        {cart?.items?.length ? (
          <div className="flex flex-col lg:flex-row gap-[30px] md:gap-[50px] lg:gap-[100px]">
            <div className="lg:basis-[65%]">
                <div className="bg-white ">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1921610D]">
                        <h2 className="text-[18px] md:text-[20px] font-bold">המוצרים שלי</h2>
                        <Link href="/store" className="text-sm font-medium gap-[5px] flex items-center !underline" dir="ltr">
                            <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.21023 -8.84631e-07L5.99279 0.668746L1.55681 4.43062L6 8.344L5.20358 9L5.53134e-07 4.41835L5.21023 -8.84631e-07Z" fill="black" />
                            </svg>
                            המשך גלישה
                        </Link>
                    </div>
                    
                    <ItemsTemplate cart={cart} />
                </div>
          </div>
             <Summary cart={cart as any} />
          </div>
        ) : (
            <EmptyCartMessage />
        )}
      </div>
    </section>
  )
}

export default CartTemplate
