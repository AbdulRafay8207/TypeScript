'use client'
import { userDataContext } from '@/context/UserContext';
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react'
import { BiSolidPencil } from "react-icons/bi";

function Page() {
  // const { data } = useSession()
  const data = useContext(userDataContext)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignout = async () => {
    try {
      setLoading(true)
      await signOut()
    } catch (error) {
      console.log("Error in signout", error)
    } finally {
      setLoading(false)
    }
  }

  // Loading State
  if (!data) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center bg-black text-white gap-3'>
        <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
        <p className='text-gray-400 text-sm animate-pulse'>Loading profile...</p>
        <button onClick={() => console.log(data)}>Click</button>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-black text-white p-4'>
      <div className='w-full max-w-md border border-gray-800 rounded-2xl p-8 shadow-2xl bg-gray-950/80 backdrop-blur-md flex flex-col items-center text-center'>

        {/* User Avatar Container */}
        {data.user?.image && (
          <div className='relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500/50 p-1 mb-5 bg-gray-900 shadow-xl shadow-blue-500/10'>
            <div className='relative w-full h-full rounded-full overflow-hidden'>
              <Image
                src={data.user.image}
                fill
                alt='UserImage'
                className='object-cover'
                priority
              />
            </div>
          </div>
        )}
        <div className='absolute top-4 right-3' onClick={() => router.push("/edit")}>
          <BiSolidPencil />
        </div>

        {/* User Info */}
        <h1 className='text-2xl font-bold tracking-tight text-white mb-1'>
          Welcome, {data.user?.name || 'User'}
        </h1>
        <p className='text-sm text-gray-400 mb-8'>{data.user?.email}</p>

        {/* Action Button */}
        <button
          onClick={handleSignout}
          disabled={loading}
          className='w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-red-600/10 flex justify-center items-center gap-2'
        >
          {loading ? (
            <>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span>Signing out...</span>
            </>
          ) : (
            <span>Sign Out</span>
          )}
        </button>

      </div>
    </div>
  )
}

export default Page 