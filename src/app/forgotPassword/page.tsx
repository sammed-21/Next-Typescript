
"use client"
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loader";
import { AnyAaaaRecord } from "dns";

export default function ForgotPage() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); // Initialize email state with an empty string

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
   };

  const confirmationEmail = async () => {
    await axios.post("/api/users/resetEmail",{email});
    setLoading(true);
   
  };
  if (!loading) {
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      <div className="flex flex-col items-center justify-center text-black rounded-lg px-4 py-2 bg-white shadow-xl border-gray-700">
        <h1>{loading ? <h1>Check your email and reset the password</h1> : "ResetPassword"}</h1>
        <hr />

        <label htmlFor="email" className="flex">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange} // Use the 'handleEmailChange' function as the onChange event handler
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        />

        <button onClick={confirmationEmail} className="border border-l-gray-600 p-2 rounded-lg bg-black text-white">
          Send
        </button>
        <Link href="/login">
          Visit the login page
        </Link>
      </div>
    </div>
  );
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black bg-white">
           <h1>Check your email and send you the link</h1>  
       
       
    </div>
    )
  }
}
