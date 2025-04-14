import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBagIcon, XIcon, TrashIcon } from 'lucide-react'
import { useCart } from '../../../contexts/clients/CartContext'
import Button from '../../ui/Button'
interface CartDropdownProps {
    isOpen: boolean
    onClose: () => void
}
const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
    const { items, removeItem, updateQuantity, total } = useCart()
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <div className="flex items-center">
                            <ShoppingBagIcon size={20} className="text-gray-600" />
                            <span className="ml-2 text-lg font-medium">Shopping Cart</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <XIcon size={20} />
                        </button>
                    </div>
                    {/* Cart Items */}
                    {items.length > 0 ? (
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-20 w-20 rounded-md object-cover"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                {item.name}
                                            </h3>
                                            {item.size && (
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Size: {item.size}
                                                </p>
                                            )}
                                            {item.color && (
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Color: {item.color}
                                                </p>
                                            )}
                                            <div className="mt-2 flex items-center">
                                                <button
                                                    className="rounded-md border px-2 py-1 text-sm"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2 min-w-[2rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="rounded-md border px-2 py-1 text-sm"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="mt-2 text-sm text-red-600 hover:text-red-500"
                                            >
                                                <TrashIcon size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-1 items-center justify-center">
                            <div className="text-center">
                                <ShoppingBagIcon size={40} className="mx-auto text-gray-400" />
                                <p className="mt-2 text-gray-500">Your cart is empty</p>
                            </div>
                        </div>
                    )}
                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-200 px-4 py-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <div className="mt-6 space-y-3">
                                <Link to="/cart" onClick={onClose}>
                                    <Button variant="primary" fullWidth>
                                        View Cart
                                    </Button>
                                </Link>
                                <Button variant="secondary" fullWidth>
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default CartDropdown
