import React, { useEffect, useState, createContext, useContext } from 'react'
interface User {
    id: string
    email: string
    name: string
}
interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, name: string) => Promise<void>
    logout: () => void
    isLoading: boolean
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const AuthProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Check for saved user in localStorage
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])
    const login = async (email: string) => {
        try {
            // Simulated API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // Mock user data
            const userData = {
                id: '1',
                email,
                name: email.split('@')[0],
            }
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
        } catch (error) {
            throw new Error('Login failed')
        }
    }
    const register = async (email: string, name: string) => {
        try {
            // Simulated API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const userData = {
                id: '1',
                email,
                name,
            }
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
        } catch (error) {
            throw new Error('Registration failed')
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
                login,
                register,
                logout,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
