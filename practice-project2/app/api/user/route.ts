import authOptions from "@/app/lib/auth";
import User from "@/app/model/userModal";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const session = await getServerSession(authOptions)
        if(!session || !session.user.email){
            return NextResponse.json(
                {message: "User's session not found"},
                {status: 400}
            )
        }
        console.log("Session id", session.user.id)
        const user = await User.findById(session.user.id).select("-password")
        if(!user){
            return NextResponse.json(
                {message: "User not found"},
                {status: 400}
            )
        }
        return NextResponse.json(
            user,
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {message: `Error in user get route ${error}`},
            {status: 500}
        )
    }
}