"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginApi } from '../lib/api'

type AuthCtx = {
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    initialized: boolean
}

const AuthContext = createContext<AuthCtx | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (t) setToken(t)
        setInitialized(true)
    }, [])

    async function login(email: string, password: string) {
        const res = await loginApi(email, password)
        localStorage.setItem('token', res.token)
        setToken(res.token)
    }

    function logout() {
        if (typeof window !== 'undefined') localStorage.removeItem('token')
        setToken(null)
    }

    return <AuthContext.Provider value={{ token, login, logout, initialized }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}