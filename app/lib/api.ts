import { startMockServer } from './mockServer'

// Start in-memory mock only in dev and only in the browser
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') startMockServer()

const base = '/api'

async function handleFetch(path: string, opts: RequestInit = {}) {
    const res = await fetch(`${base}${path}`, {
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
        ...opts,
    })
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Request failed: ${res.status}`)
    }
    return res.json().catch(() => null)
}

export const loginApi = async (email: string, password: string) => {
    return handleFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export const getStats = async () => {
    return handleFetch('/dashboard/stats')
}

export const getProducts = async (params = {}) => {
    const qs = new URLSearchParams(params as Record<string, any>).toString()
    return handleFetch(`/products${qs ? `?${qs}` : ''}`)
}

export const createProduct = async (p: any) => {
    return handleFetch('/products', { method: 'POST', body: JSON.stringify(p) })
}

export const updateProduct = async (id: string, p: any) => {
    return handleFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(p) })
}

export const deleteProduct = async (id: string) => {
    return handleFetch(`/products/${id}`, { method: 'DELETE' })
}

export default null