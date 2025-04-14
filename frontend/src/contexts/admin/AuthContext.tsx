import React, { useEffect, useState, createContext, useContext } from 'react'
interface User {
    id: string
    email: string
    name: string
    role: string
}
interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string, remember: boolean) => Promise<void>
    logout: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // Check for saved user data in localStorage
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])
    const login = async (email: string, password: string, remember: boolean) => {
        try {
            setLoading(true)
            // In a real app, this would be an API call
            // Simulating API call with timeout
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // Mock successful login
            if (email === 'admin@example.com' && password === 'password') {
                const user = {
                    id: '1',
                    email: 'admin@example.com',
                    name: 'Admin User',
                    role: 'admin',
                }
                setUser(user)
                if (remember) {
                    localStorage.setItem('user', JSON.stringify(user))
                }
            } else {
                throw new Error('Invalid credentials')
            }
        } finally {
            setLoading(false)
        }
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
