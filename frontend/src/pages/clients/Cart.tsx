import { Link } from 'react-router-dom'
import { TrashIcon } from 'lucide-react'
import Button from '../../components/ui/Button'
import { useCart } from '../../contexts/clients/CartContext'
const Cart = () => {
    const { items, removeItem, updateQuantity, total, itemsCount } = useCart()
    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">
                    Looks like you haven't added any items to your cart yet.
                </p>
                <Link to="/products">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        )
    }
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-8">
                        <div className="space-y-8">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start border-b border-gray-200 pb-8"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-24 w-24 rounded-md object-cover"
                                        />
                                    </div>
                                    <div className="ml-6 flex-1">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
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
                                            </div>
                                            <p className="text-lg font-medium text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    className="px-3 py-1 text-gray-600 hover:text-gray-700"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-1 text-gray-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="px-3 py-1 text-gray-600 hover:text-gray-700"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-600 hover:text-red-500"
                                            >
                                                <TrashIcon size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Order Summary */}
                    <div className="mt-16 lg:mt-0 lg:col-span-4">
                        <div className="bg-gray-50 rounded-lg px-6 py-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Subtotal ({itemsCount} items)</p>
                                    <p className="text-gray-900">${total.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Shipping</p>
                                    <p className="text-gray-900">Free</p>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between">
                                        <p className="text-lg font-medium text-gray-900">Total</p>
                                        <p className="text-lg font-medium text-gray-900">
                                            ${total.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="primary" fullWidth className="mt-6">
                                Proceed to Checkout
                            </Button>
                            <div className="mt-4 text-center">
                                <Link
                                    to="/products"
                                    className="text-sm text-blue-900 hover:text-blue-800"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart
