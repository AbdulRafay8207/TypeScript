import authOptions from "@/app/lib/auth";
import uploadOnCloudinary from "@/app/lib/cloudinary";
import connectDb from "@/app/lib/db";
import User from "@/app/model/userModal";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        console.log("edit log 1")
        const session = await getServerSession(authOptions)
        console.log("edit log 2")
        if(!session || !session.user.email){
            return NextResponse.json(
                {message: "User session not found"},
                {status: 400}
            )
        }
        console.log("edit log 3")
        const formData = await req.formData()
        const name = formData.get("name") as string
        const file = formData.get("file") as Blob | null
        console.log("edit log 4")
        let imageUrl;

        if(file){
            console.log("edit log !",file)
            imageUrl = await uploadOnCloudinary(file)
            console.log("edit log !!")
        }
        console.log("edit log 5")
        const user = await User.findByIdAndUpdate(session.user.id,{
            name,image:imageUrl
        },{new: true})
        console.log("edit log 6")
        if(!user){
            return NextResponse.json(
                {message: "User not found"},
                {status: 400}
            )
        }
        console.log("edit log 7")
        return NextResponse.json(
            user,
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {message: `Edit error ${error}`},
            {status: 500}
        )
    }
}