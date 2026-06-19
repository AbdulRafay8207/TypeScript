import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "../model/userModal";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { LuEthernetPort } from "react-icons/lu";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "text" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email
                const password = credentials?.password
                if (!email || !password) {
                    throw new Error("Email or password not found.")
                }
                await connectDb()
                const user = await User.findOne({ email })
                if (!user) {
                    throw new Error("User not found.")
                }
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    throw new Error("Incorrect password.")
                }

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider == "google") {
                await connectDb()
                console.log(process.env.GOOGLE_CLIENT_ID)
                console.log(process.env.GOOGLE_CLIENT_SECRET)
                console.log("hellllllllllllllllllllllllllllllllooooo", user)
                let existUser = await User.findOne({ email: user.email })
                if (!existUser) {
                    existUser = await User.create({
                        name: user.name,
                        email: user.email
                    })
                }
                user.id = existUser._id.toString()
            }
            return true
        },

        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.image = user.image
            }
            return token
        },

        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image as string
            }
            return session
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 1000 * 60
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default authOptions