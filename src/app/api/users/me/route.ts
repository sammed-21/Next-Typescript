import { getDataFromToken } from "@/helpers/getDataFromToken"

import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel"

import {connectToDB} from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        await connectToDB();
        console.log("came here")
        const userId= await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User Found",
            data:user
        })
    } catch (err:any) {
        console.log(err.message)
    }  

}