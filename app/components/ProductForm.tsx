'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createProduct, updateProduct } from '../lib/api'


export default function ProductForm({ initial, onSaved }: { initial?: any; onSaved?: () => void }) {
    const { register, handleSubmit } = useForm({ defaultValues: initial || {} })


    async function onSubmit(values: any) {
        if (initial?.id) {
            await updateProduct(initial.id, values)
        } else {
            await createProduct(values)
        }
        onSaved && onSaved()
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input {...register('name')} placeholder="Name" />
            <input type="number" {...register('price')} placeholder="Price" />
            <input type="number" {...register('stock')} placeholder="Stock" />
            <input {...register('category')} placeholder="Category" />
            <button type="submit">Save</button>
        </form>
    )
}