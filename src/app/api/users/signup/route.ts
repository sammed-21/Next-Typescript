import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connectToDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
connectToDB();
export const POST = async (request: NextRequest) => {
    
  try {
    console.log("enter the game")
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(`before login ${email}`);
    console.log(reqBody);
         
    console.log("4");
    const user = await User.findOne({ email });
    if (user) {
      console.log("3");

      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    console.log("4");
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
  
    console.log(savedUser);
    //send email for verification
      
    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
    return  NextResponse.json(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
