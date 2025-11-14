
import { Metadata } from "next"
import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"

import { StoreCartShippingOption } from "@medusajs/types"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}
// export const revalidate = 5;
export default async function PageLayout(props: { children: React.ReactNode }) {

  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}
