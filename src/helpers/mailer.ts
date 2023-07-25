import nodemailer from "nodemailer";

import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(
            userId,
            {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000,
            },
          //   {
          //     new: true,
          //     runValidators: true,
          //   }
          );
      }
      else if (emailType === "RESET") {
        await User.findByIdAndUpdate(
            userId,
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            },
          //   {
          //     new: true,
          //     runValidators: true,
          //   }
          );
      }
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "298cc6fa6da4c5",
          pass: "177b2612991d51"
        }
      });
      const mailOptions = {
          from: "sammedbetadur21@gmail.com",
          to: email,
          subject: emailType === "VERIFY" ? "verify your email" : "Reset your password",
          html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY" ? "verify your email" : "Reset your password"} or copy and paste the link below in your browser. <br/> 
             ${process.env.DOMAIN}/${emailType==="VERIFY"?"verifyemail":"resetPassword"}?token=${hashedToken}
              </p>`
      }   
      const mailResponse  = await transport.sendMail(mailOptions);
      return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
