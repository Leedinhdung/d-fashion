import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Button from '../../components/ui/Button'
import { useAuth } from '../../contexts/clients/AuthContext'
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { login, register } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        try {
            if (isLogin) {
                await login(email, password)
            } else {
                await register(email, password, name)
            }
            // Redirect to the previous page or home
            const from = location.state?.from?.pathname || '/'
            navigate(from)
        } catch (err) {
            setError('Authentication failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">
                <div className="bg-white px-8 py-12 shadow-sm rounded-lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {isLogin ? 'Sign in to your account' : 'Create a new account'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isLogin ? (
                                <>
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className="text-blue-900 hover:text-blue-800 font-medium"
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className="text-blue-900 hover:text-blue-800 font-medium"
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    required={!isLogin}
                                />
                            </div>
                        )}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <Button type="submit" fullWidth disabled={isLoading}>
                            {isLoading
                                ? 'Loading...'
                                : isLogin
                                    ? 'Sign in'
                                    : 'Create account'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Auth
