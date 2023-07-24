// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import User from "@/models/userModel";
// import { connectToDB } from "@/dbConfig/dbConfig";
// import jwt from "jsonwebtoken";
// connectToDB();
// export async function POST (request: NextRequest, response: NextResponse) => {
//   try {
//     console.log("hi")
//     const reqBody = await request.json();
//     console.log("enter the game")
//     const { email, password } = reqBody;
//     console.log(reqBody)
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { error: "user does not exist" },
//         { status: 400 }
//       );
//     }
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return NextResponse.json({ error: "invalid password" }, { status: 400 });
//     }
//     //create the token data
//     const tokenData = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     };
//     const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
//       expires: "1d",
//     });

//     const response = NextResponse.json({
//       message: "login successful",
//       success: true,
//     });
//     response.cookies.set("token", token, {
//       httpOnly: true,
      
//     });
//     return response;
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }), { status: 500 };
//   }
// };
import {connectToDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDB()

export const POST = async (request: NextRequest) => {
    try {
console.log("hi")
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
console.log(token)
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}