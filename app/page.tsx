'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from './context/AuthContext'
import { useForm } from 'react-hook-form'


type Form = { email: string; password: string }
export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const { register, handleSubmit } = useForm<Form>()


  async function onSubmit(data: Form) {
    try {
      await login(data.email, data.password)
      router.push('/dashboard')
    } catch (e) {
      alert('Login failed')
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input {...register('email')} placeholder="Email" className="w-full mb-3 p-2 border rounded" />
        <input {...register('password')} placeholder="Password" type="password" className="w-full mb-3 p-2 border rounded" />
        <button className="w-full p-2 bg-indigo-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}