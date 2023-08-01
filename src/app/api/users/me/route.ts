// import { getDataFromToken } from "@/helpers/getDataFromToken"

// import { NextRequest, NextResponse } from "next/server";

// import User from "@/models/userModel"

// import {connectToDB} from "@/dbConfig/dbConfig";

// export async function GET(request: NextRequest) {
//     try {
//         await connectToDB();
//         console.log("came here")
//         const userId:any = await getDataFromToken(request);
//         console.log(userId)
//         const user = await User.findOne({ _id: userId }).select("-password");
//         return NextResponse.json({
//             message: "User Found",
//             data:user   
//         })
//     } catch (err:any) {
//         console.log(err.message)
//     }  

// }

import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDB } from "@/dbConfig/dbConfig";

connectToDB();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}