'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

type userContextType = {
    user: userType | null | undefined,
    setUser: (user: userType) => void
}

type userType = {
    name: string,
    email: string,
    id: string,
    image?: string
}

export const userDataContext = createContext<userContextType | undefined>(undefined)

function UserContext({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<userType | null>()
    const session = useSession()
    const data = {
        user,
        setUser
    }

    useEffect(() => {
        async function getUser() {
            try {
                console.log("log in context")
                const response = await axios.get("http://localhost:3000/api/user")
                setUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    return(
        <userDataContext.Provider value={data}>
            {children}
        </userDataContext.Provider>
    )
}
export default UserContext