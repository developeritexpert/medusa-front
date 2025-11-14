import { deleteLineItem } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {
  isDeleting ? (
    <Spinner className="animate-spin" />
  ) : (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.2334 4.31738L3.28934 15.2957H11.4103L13.1579 4.31738H1.2334Z"
        fill="black"
      />
      <path
        d="M14.3916 2.26154H10.5262V0H3.86538V2.26154H0V3.4951H14.3916V2.26154Z"
        fill="black"
      />
    </svg>
  )
}

        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
