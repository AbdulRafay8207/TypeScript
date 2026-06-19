import { NextResponse } from "next/server";

export async function GET() {
    console.log("WORKS")
    return NextResponse.json({
        name: "abdul",
        age: 120
    })
}