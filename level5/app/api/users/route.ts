import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        name: "Moiz",
        age: 21
    })
}

export async function POST(request:NextRequest) {
    const {name, age} = await request.json()

    return NextResponse.json({
        name,age
    })
}