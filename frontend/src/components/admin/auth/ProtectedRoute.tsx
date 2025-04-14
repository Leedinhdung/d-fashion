import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../contexts/admin/AuthContext'
interface ProtectedRouteProps {
    children: React.ReactNode
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        )
    }
    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: location,
                }}
                replace
            />
        )
    }
    return <>{children}</>
}
export default ProtectedRoute
