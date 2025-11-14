"use client"

import { IconBadge, clx } from "@medusajs/ui"
import {
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

type CartItemQuantityInputProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">

const CartItemQuantityInput = forwardRef<HTMLInputElement, CartItemQuantityInputProps>(
  ({ 
    value, 
    onChange, 
    min = 1, 
    max = 10, 
    className, 
    ...props 
  }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null)
    const [quantity, setQuantity] = useState(value)

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => innerRef.current
    )

    // Sync internal state with external value
    useEffect(() => {
      setQuantity(value)
    }, [value])

    // Debounce onChange calls
    useEffect(() => {
      if (quantity !== value && quantity >= min && quantity <= max) {
        const timer = setTimeout(() => {
          onChange(quantity)
        }, 500)
        return () => clearTimeout(timer)
      }
    }, [quantity, min, max])

    const handleIncrement = () => {
      if (quantity < max) {
        const newValue = quantity + 1
        setQuantity(newValue)
        onChange(newValue)
      }
    }

    const handleDecrement = () => {
      if (quantity > min) {
        const newValue = quantity - 1
        setQuantity(newValue)
        onChange(newValue)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value)
      
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        setQuantity(newValue)
      } else if (e.target.value === "") {
        // Allow empty input temporarily
        setQuantity(min)
      }
    }

    const handleBlur = () => {
      // Correct invalid values on blur
      if (quantity < min) {
        setQuantity(min)
        onChange(min)
      } else if (quantity > max) {
        setQuantity(max)
        onChange(max)
      }
    }

    return (
      <div className="flex items-center gap-1 rounded-[50px] bg-[#19216108]">

          {/* Decrement Button */}
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= min}
            className="w-6 h-8 flex items-center justify-center"
            aria-label="Decrease quantity"
          >
            <svg 
              className="w-3 h-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20 12H4" 
              />
            </svg>
          </button>

          {/* Quantity Input */}
          <input
            ref={innerRef}
            type="number"
            min={min}
            max={max}
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-8 text-center font-medium"
            {...props}
          />

          {/* Increment Button */}
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= max}
            className="w-6 h-8 flex items-center justify-center"
            aria-label="Increase quantity"
          >
            <svg 
              className="w-3 h-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </button>
    
      </div>
    )
  }
)

CartItemQuantityInput.displayName = "CartItemQuantityInput"

export default CartItemQuantityInput