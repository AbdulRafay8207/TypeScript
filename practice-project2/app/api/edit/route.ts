import authOptions from "@/app/lib/auth";
import uploadOnCloudinary from "@/app/lib/cloudinary";
import connectDb from "@/app/lib/db";
import User from "@/app/model/userModal";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const session = await getServerSession(authOptions)
        if(!session || !session.user.email){
            return NextResponse.json(
                {message: "User session not found"},
                {status: 400}
            )
        }
        const formData = await req.formData()
        const name = formData.get("name") as string
        const file = formData.get("file") as Blob | null

        let imageUrl = session.user.image ?? null

        if(file){
            imageUrl = await uploadOnCloudinary(file)
        }
        const user = await User.findByIdAndUpdate(session.user.id,{
            name,image:imageUrl
        },{new: true})

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
            {message: `Edit errir ${error}`},
            {status: 500}
        )
    }
}