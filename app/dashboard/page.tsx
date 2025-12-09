'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { getStats } from '../lib/api'
import StatsGrid from '../components/Statsgrid'
import Products from '../components/Products'


export default function DashboardPage() {
    const { token, logout, initialized } = useAuth()
    const router = useRouter()


    useEffect(() => {
        if (initialized && !token) router.push('/')
    }, [initialized, token, router])


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div>
                        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
                    </div>
                </div>
                <StatsGrid fetcher={getStats} />
                {/* Product list component */}
                <div className="mt-6">
                    {/* placeholder for ProductTable */}
                    <h2 className="text-xl font-semibold mb-2">Products</h2>
                    <Products/>
                </div>
            </div>
        </div>
    )
}