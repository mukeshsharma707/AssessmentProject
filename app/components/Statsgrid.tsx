import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


export default function StatsGrid({ fetcher }: { fetcher: () => Promise<any> }) {
    const [data, setData] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)
    const [productData, setProductData] = useState<any[]>([]);
    const API_URL = "http://localhost:3009/products";

    // Fetch products
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(API_URL);
                setProductData(response.data);
            } catch (err) {
                toast.error("Failed to fetch products");
                console.error(err);
            }
        };
        getProducts();
    }, []);


    React.useEffect(() => {
        fetcher().then((r) => {
            setData(r)
            setLoading(false)
        })
    }, [fetcher])


    if (loading) return <div>Loading stats...</div>


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <div className="text-sm">Total Products</div>
                <div className="text-2xl font-bold">{productData.length}</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <div className="text-sm">Today's Orders</div>
                <div className="text-2xl font-bold">{data.todayOrders}</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <div className="text-sm">Revenue (This Month)</div>
                <div className="text-2xl font-bold">${data.monthlyRevenue}</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <div className="text-sm">Low Stock</div>
                <div className="text-2xl font-bold">{data.lowStockProducts}</div>
            </div>
        </div>
    )
}