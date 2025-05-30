"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  quantity: number
  variant?: {
    color?: string
    storage?: string
  }
  maxStock: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string; variant?: CartItem["variant"] } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number; variant?: CartItem["variant"] } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string, variant?: CartItem["variant"]) => void
  updateQuantity: (id: string, quantity: number, variant?: CartItem["variant"]) => void
  clearCart: () => void
  getItemQuantity: (id: string, variant?: CartItem["variant"]) => number
  isInCart: (id: string, variant?: CartItem["variant"]) => boolean
} | null>(null)

const getItemKey = (id: string, variant?: CartItem["variant"]) => {
  if (!variant) return id
  return `${id}-${variant.color || ""}-${variant.storage || ""}`
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const itemKey = getItemKey(action.payload.id, action.payload.variant)
      const existingItemIndex = state.items.findIndex((item) => getItemKey(item.id, item.variant) === itemKey)

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Item já existe, atualizar quantidade
        const existingItem = state.items[existingItemIndex]
        const newQuantity = Math.min(existingItem.quantity + (action.payload.quantity || 1), action.payload.maxStock)

        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: newQuantity } : item,
        )
      } else {
        // Novo item
        const newItem: CartItem = {
          ...action.payload,
          quantity: Math.min(action.payload.quantity || 1, action.payload.maxStock),
        }
        newItems = [...state.items, newItem]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "REMOVE_ITEM": {
      const itemKey = getItemKey(action.payload.id, action.payload.variant)
      const newItems = state.items.filter((item) => getItemKey(item.id, item.variant) !== itemKey)

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "UPDATE_QUANTITY": {
      const itemKey = getItemKey(action.payload.id, action.payload.variant)

      if (action.payload.quantity <= 0) {
        return cartReducer(state, {
          type: "REMOVE_ITEM",
          payload: { id: action.payload.id, variant: action.payload.variant },
        })
      }

      const newItems = state.items.map((item) => {
        if (getItemKey(item.id, item.variant) === itemKey) {
          return {
            ...item,
            quantity: Math.min(action.payload.quantity, item.maxStock),
          }
        }
        return item
      })

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      }

    case "LOAD_CART": {
      const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        items: action.payload,
        totalItems,
        totalPrice,
      }
    }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string, variant?: CartItem["variant"]) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, variant } })
  }

  const updateQuantity = (id: string, quantity: number, variant?: CartItem["variant"]) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity, variant } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getItemQuantity = (id: string, variant?: CartItem["variant"]) => {
    const itemKey = getItemKey(id, variant)
    const item = state.items.find((item) => getItemKey(item.id, item.variant) === itemKey)
    return item?.quantity || 0
  }

  const isInCart = (id: string, variant?: CartItem["variant"]) => {
    return getItemQuantity(id, variant) > 0
  }

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
