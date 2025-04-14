import React from 'react'
interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    className?: string
}
const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
}) => {
    const baseStyles =
        'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
    const variantStyles = {
        primary: 'bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-500',
        secondary:
            'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
        outline:
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    }
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
    }
    const widthStyles = fullWidth ? 'w-full' : ''
    const disabledStyles = disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer'
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
        >
            {children}
        </button>
    )
}
export default Button
