import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connectToDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

export const POST = async (request: NextRequest) => {
  try {
    await connectToDB();
console.log("data base is connected")
const reqBody = await request.json();
const { email } = reqBody;

const user = await User.findOne({ email })
      if (!user) {
    console.log("user donot exists")
    return NextResponse.json({
        error:"User doesnot exissts signup "
    },{status:400})
}
console.log("user exists in the database send the mail")
      await sendEmail({email, emailType:"RESET",userId:user._id });
 return NextResponse.json({message:"send the email"},{status:200})
      return NextResponse.json("message:success",{status:200})
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
