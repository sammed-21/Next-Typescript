import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    console.log("✅✅ Connected to the database.");

    const reqBody = await request.json();

    const { password, confirmPassword, token } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
      // forgetPasswordTokenExpiry: { $gt: Date.now() }, // Check if the token is not expired
    });
    // const user = await User.findOne({forgotPasswordToken :token ,forgotPasswordTokenExpiry:{$gt: Date.now()}});
    console.log("✅✅ Found user:", user);
    console.log(confirmPassword);
    if (!user) {
      return NextResponse.json({ error: "invlid token" }, { status: 400 });
    }
    console.log(user.password);
    if (password === confirmPassword) {
      let newPassword = await bcryptjs.hash(confirmPassword, 10);

      user.password = newPassword;
      await user.save();
    } else {
      console.log("false");
      return NextResponse.json(
        { error: "password doesn't match" },
        { status: 400 }
      );
    }
    console.log(user.password);

    return NextResponse.json({ message: "reset password", success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
