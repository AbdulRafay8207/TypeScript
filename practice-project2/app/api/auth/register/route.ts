import connectDb from "@/app/lib/db";
import User from "@/app/model/userModal";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {name, email, password} = await req.json()
        await connectDb()
        const exsistUser = await User.findOne({email})
        if(exsistUser){
            return NextResponse.json(
                {message: "User with this email already exsist."},
                {status: 400}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password: hashedPassword
        })
        return NextResponse.json(
            {message: `User successfully created. ${user}`},
            {status: 201}
        )
    } catch (error) {
        return NextResponse.json(
            {message: `Failed to register user ${error}`},
            {status: 500}
        )
    }
}