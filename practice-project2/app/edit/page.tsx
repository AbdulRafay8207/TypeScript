'use client'
import { useSession } from "next-auth/react"
import { CgProfile } from "react-icons/cg";
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Page() {
    const [name, setName] = useState("")
    const [frontendImage, setFrontendImage] = useState("")
    const [backendImage, setBackendImage] = useState<File>()
    const imageInput = useRef<HTMLInputElement>(null)
    const { data } = useSession()
    
    const initialized = useRef(false);

    useEffect(() => {
        if (!data || initialized.current) return;

        initialized.current = true;
        setName(data.user?.name ?? "");
        setFrontendImage(data.user?.image ?? "");
    }, [data]);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length == 0) return
        const file = files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name",name)
            if(backendImage){
                formData.append("file",backendImage)
            }
            const result = await axios.post("/api/edit",formData)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-black text-white p-4">
            <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8 shadow-2xl bg-gray-950/80 backdrop-blur-md">
                <h1 className="text-2xl font-bold tracking-tight text-center mb-8">Edit Profile</h1>
                <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
                    {/* Explicitly injected inline style heights/widths and Tailwind arbitrary units so it's physically impossible to be small */}
                    <div
                        style={{ width: '128px', height: '128px', minWidth: '128px', minHeight: '128px' }}
                        className="relative w-[128px] h-[128px] min-w-[128px] min-h-[128px] aspect-square flex-shrink-0 rounded-full overflow-hidden border-2 border-dashed border-gray-700 hover:border-blue-500 cursor-pointer flex items-center justify-center bg-gray-900 transition-colors"
                        onClick={() => imageInput.current?.click()}
                    >
                        <input type="file" accept="image/*" hidden ref={imageInput} onChange={handleImage} />
                        {frontendImage ? <Image src={frontendImage} fill alt="UserImage" className="object-cover rounded-full w-full h-full" /> : <CgProfile className="text-5xl text-gray-400" style={{ fontSize: '48px' }} />}
                    </div>
                    <div className='flex flex-col gap-1.5 w-full'>
                        <label className='text-sm font-medium text-gray-300'>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter your name'
                            className='w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-blue-600/20 mt-2">Save</button>
                </form>
            </div>
        </div>
    )
}

export default Page