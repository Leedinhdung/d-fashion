import React, { useEffect, useState, createContext, useContext } from 'react'
interface CartItem {
    id: number
    name: string
    price: number
    image: string
    quantity: number
    size?: string
    color?: string
}
interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
    removeItem: (itemId: number) => void
    updateQuantity: (itemId: number, quantity: number) => void
    clearCart: () => void
    itemsCount: number
    total: number
}
const CartContext = createContext<CartContextType | undefined>(undefined)
export const CartProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([])
    useEffect(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            setItems(JSON.parse(savedCart))
        }
    }, [])
    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])
    const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((i) => i.id === item.id)
            if (existingItem) {
                return currentItems.map((i) =>
                    i.id === item.id
                        ? {
                            ...i,
                            quantity: i.quantity + quantity,
                        }
                        : i,
                )
            }
            return [
                ...currentItems,
                {
                    ...item,
                    quantity,
                },
            ]
        })
    }
    const removeItem = (itemId: number) => {
        setItems((currentItems) =>
            currentItems.filter((item) => item.id !== itemId),
        )
    }
    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) {
            removeItem(itemId)
            return
        }
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        quantity,
                    }
                    : item,
            ),
        )
    }
    const clearCart = () => {
        setItems([])
    }
    const itemsCount = items.reduce((total, item) => total + item.quantity, 0)
    const total = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    )
    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                itemsCount,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
