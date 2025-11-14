"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/cart/components/cart-thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    // <pre>{JSON.stringify(item, null, 2)}  </pre>
    <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4">
      <div className="md:w-32 md:h-32 w-full h-48 md:p-2 p-4 flex-shrink-0 border border-[#1921610D] bg-[#19216103] rounded-[10px]">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
          >
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
        </LocalizedClientLink>
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-[10px] mb-2">
            <div className="basis-[50%] w-full">
                <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold max-w-[300px] text-right">{item.product_title}</h3>
                <LineItemOptions variant={item.variant} data-testid="product-variant" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[18px] font-semibold text-[#0A90C8]">
                            {/* ₪{item.price.toLocaleString()} */}
                            {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                            <LineItemUnitPrice
                              item={item}
                              style="tight"
                              currencyCode={currencyCode}
                            />
                        </span>
                        {/* {item.originalPrice > item.price && (
                            <span className="text-[#919191] line-through">
                                ₪{item.originalPrice.toLocaleString()}
                            </span>
                        )} */}
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-between gap-[20px] basis-[50%]">
                  <CartItemSelect
                        value={item.quantity}
                        onChange={(value) => changeQuantity(value)}
                        min={1}
                        max={Math.min(maxQuantity, 10)}
                        className="w-28 h-10"
                        data-testid="product-quantity-input"
                      />
                    {updating && <Spinner />}
                <ErrorMessage error={error} data-testid="product-error-message" />
                <div>
                    <span className="duration-300">
                      {type === "preview" && (
                        <span className="flex gap-x-1 ">
                          <Text className="text-ui-fg-muted">{item.quantity}x </Text>
                          <LineItemUnitPrice
                            item={item}
                            style="tight"
                            currencyCode={currencyCode}
                          />
                        </span>
                      )}
                      <LineItemPrice
                        item={item}
                        style="tight"
                        currencyCode={currencyCode}
                      />
                    </span>
                </div>
                <DeleteButton id={item.id} data-testid="product-delete-button" />
                {/* <button
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer"
                >
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.2334 4.31738L3.28934 15.2957H11.4103L13.1579 4.31738H1.2334Z" fill="black" />
                        <path d="M14.3916 2.26154H10.5262V0H3.86538V2.26154H0V3.4951H14.3916V2.26154Z" fill="black" />
                    </svg>
                </button> */}
            </div>
        </div>
    </div>

    </div>
        
    
    // <Table.Row className="w-full" data-testid="product-row">
    //   <Table.Cell className="!pl-0 p-4 w-24">
    //     <LocalizedClientLink
    //       href={`/products/${item.product_handle}`}
    //       className={clx("flex", {
    //         "w-16": type === "preview",
    //         "small:w-24 w-12": type === "full",
    //       })}
    //     >
    //       <Thumbnail
    //         thumbnail={item.thumbnail}
    //         images={item.variant?.product?.images}
    //         size="square"
    //       />
    //     </LocalizedClientLink>
    //   </Table.Cell>

    //   <Table.Cell className="text-left">
    //     <Text
    //       className="txt-medium-plus text-ui-fg-base"
    //       data-testid="product-title"
    //     >
    //       {item.product_title}
    //     </Text>
    //     <LineItemOptions variant={item.variant} data-testid="product-variant" />
    //   </Table.Cell>

    //   {type === "full" && (
    //     <Table.Cell>
    //       <div className="flex gap-2 items-center w-28">
    //         <DeleteButton id={item.id} data-testid="product-delete-button" />
    //         <CartItemSelect
    //           value={item.quantity}
    //           onChange={(value) => changeQuantity(parseInt(value.target.value))}
    //           className="w-14 h-10 p-4"
    //           data-testid="product-select-button"
    //         >
    //           {/* TODO: Update this with the v2 way of managing inventory */}
    //           {Array.from(
    //             {
    //               length: Math.min(maxQuantity, 10),
    //             },
    //             (_, i) => (
    //               <option value={i + 1} key={i}>
    //                 {i + 1}
    //               </option>
    //             )
    //           )}

    //           <option value={1} key={1}>
    //             1
    //           </option>
    //         </CartItemSelect>
    //         {updating && <Spinner />}
    //       </div>
    //       <ErrorMessage error={error} data-testid="product-error-message" />
    //     </Table.Cell>
    //   )}

    //   {type === "full" && (
    //     <Table.Cell className="hidden small:table-cell">
    //       <LineItemUnitPrice
    //         item={item}
    //         style="tight"
    //         currencyCode={currencyCode}
    //       />
    //     </Table.Cell>
    //   )}

    //   <Table.Cell className="!pr-0">
    //     <span
    //       className={clx("!pr-0", {
    //         "flex flex-col items-end h-full justify-center": type === "preview",
    //       })}
    //     >
    //       {type === "preview" && (
    //         <span className="flex gap-x-1 ">
    //           <Text className="text-ui-fg-muted">{item.quantity}x </Text>
    //           <LineItemUnitPrice
    //             item={item}
    //             style="tight"
    //             currencyCode={currencyCode}
    //           />
    //         </span>
    //       )}
    //       <LineItemPrice
    //         item={item}
    //         style="tight"
    //         currencyCode={currencyCode}
    //       />
    //     </span>
    //   </Table.Cell>
    // </Table.Row>
  )
}

export default Item
