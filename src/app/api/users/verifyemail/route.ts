import { connectToDB } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
 



export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        console.log("✅✅")
        const reqBody = await request.json();
        console.log("1")
        const { token } = reqBody;
        console.log(token);

       const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
       console.log(user)
        
        if (!user) {
            return NextResponse.json({error:"invlid token" },{status:400})
        }

        user.isVeified=true;
        user.verifyToke = undefined;
        user.verfiyTOkenExpiry = undefined;
        await user.save();

        return NextResponse.json({message:"email verified",success:true})

   
   
   
    } catch (err: any) {
        return NextResponse.json({error:err.message},{status:500})
    }
}