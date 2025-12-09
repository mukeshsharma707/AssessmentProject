export function startMockServer() {
    // Only run in a browser environment
    if (typeof window === 'undefined') return

    const orig = window.fetch.bind(window)

    const products = [
        { id: 'prod_1', name: 'Widget A', price: 9.99, stock: 12, createdAt: new Date().toISOString() },
        { id: 'prod_2', name: 'Widget B', price: 19.99, stock: 4, createdAt: new Date().toISOString() },
        { id: 'prod_3', name: 'Widget C', price: 29.99, stock: 20, createdAt: new Date().toISOString() },
    ]

    window.fetch = async (input: any, init: any = {}) => {
        const url = typeof input === 'string' ? input : input.url
        if (!url.startsWith('/api')) return orig(input, init)

        // tiny router
        if (url === '/api/auth/login' && init.method === 'POST') {
            return new Response(JSON.stringify({ token: 'jwt-ogewdhwqgfeuh76476whdfg3973' }), { status: 200 })
        }

        if (url.startsWith('/api/dashboard/stats') && (!init.method || init.method === 'GET')) {
            return new Response(
                JSON.stringify({ totalProducts: 156, todayOrders: 24, monthlyRevenue: 12540.75, lowStockProducts: 8 }),
                { status: 200 }
            )
        }

        if (url.startsWith('/api/products')) {
            if (!init.method || init.method === 'GET') {
                return new Response(JSON.stringify({ products, total: products.length, page: 1, limit: 10 }), { status: 200 })
            }
            if (init.method === 'POST') {
                const body = JSON.parse(init.body)
                const item = { ...body, id: `prod_${products.length + 1}`, createdAt: new Date().toISOString() }
                products.unshift(item)
                return new Response(JSON.stringify(item), { status: 201 })
            }
            if (init.method === 'PUT' || init.method === 'DELETE') {
                const id = url.split('/').pop()
                if (init.method === 'DELETE') {
                    const idx = products.findIndex((p: any) => p.id === id)
                    if (idx >= 0) products.splice(idx, 1)
                    return new Response(JSON.stringify({ success: true }), { status: 200 })
                }
                if (init.method === 'PUT') {
                    const body = JSON.parse(init.body)
                    const idx = products.findIndex((p: any) => p.id === id)
                    if (idx >= 0) products[idx] = { ...products[idx], ...body }
                    return new Response(JSON.stringify(products[idx]), { status: 200 })
                }
            }
        }

        return orig(input, init)
    }
}