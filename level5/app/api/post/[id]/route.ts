import { NextRequest, NextResponse } from "next/server"

type ParamsType = {
    params: {
        id: number
    }
}

export async function GET(request: NextRequest,{ params }: ParamsType) {
    const {id} =  params
    return NextResponse.json({
        postId: id
    })
}