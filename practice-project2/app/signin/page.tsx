'use client'
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface FormType {
    name: string
    email: string
    password: string
}

const EMPTY_FORM: FormType = {
    name: "",
    email: "",
    password: ""
}

function Signin() {
    const [form, setForm] = useState({...EMPTY_FORM})
    const router = useRouter()

    const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handleSingin = async (e:React.ChangeEvent<HTMLFormElement>) => {
        // console.log("Singin log 1")
        e.preventDefault()
        // console.log("Singin log 2")
        try {
            // console.log("Singin log 3")
            await axios.post("http://localhost:3000/api/auth/register",form)
            // console.log("Singin log 4")
            router.push("/login")      
            // console.log("Singin log 5")      
        } catch (error) {
            throw new Error(`Error in signin ${error}`)
        }
    }
    return (
        <div className='min-h-screen flex justify-center items-center bg-black text-white p-4'>
            <div className='border border-gray-800 w-full max-w-md rounded-2xl p-8 shadow-2xl bg-gray-950/80 backdrop-blur-md'>
                <h1 className='text-3xl font-bold mb-6 text-center tracking-tight'>Sign In</h1>
                
                <form className='space-y-4' onSubmit={handleSingin}>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-300'>Name</label>
                        <input 
                            type="text"
                            name="name"
                            placeholder='Enter your name' 
                            className='w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-300'>Email</label>
                        <input 
                            type="email"
                            name="email"
                            placeholder='Enter your email' 
                            className='w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-300'>Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder='Enter your password' 
                            className='w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                            onChange={handleChange}
                        />
                    </div>
                    
                    <p className='text-sm text-gray-400 text-center pt-1'>
                        Already have an account? <span className='text-blue-400 hover:underline cursor-pointer font-medium' onClick={() => {router.push("/login")}}>Login</span>
                    </p>
                    
                    <button type="submit" className='w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-blue-600/20'>
                        Sign In
                    </button>
                </form>

                <div className='flex items-center my-6 text-gray-500'>
                    <hr className='w-full border-gray-800' />
                    <span className='px-3 text-xs font-semibold tracking-wider uppercase'>OR</span>
                    <hr className='w-full border-gray-800' />
                </div>

                <button className='w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors border border-gray-200'
                onClick={async () => {
                    await signIn('google',{
                        callbackUrl: "/"
                    })
                }}>
                    <FcGoogle className='text-xl' />
                    <span>Sign up with Google</span>
                </button>
            </div>
        </div>
    )
}

export default Signin