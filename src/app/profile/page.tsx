 
'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import toast, { Toaster }  from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({ id: "", email: "" });
 
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logout successful");
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios('/api/users/me');
      setData({
        id: res.data.data._id,
        email: res.data.data.email,
      });
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full justify-center py-6 items-center text-pink-200">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>This is a profile page</h1>
      <h2 className="bg-green-500 py-3 text-white">{data.id === "" ? "Nothing" : <Link href={`profile/${data.id}`}>{data.id}</Link>}</h2>
      <button onClick={logout} className="bg-blue-600 p-3">
        Logout
      </button>
      <button onClick={getUserDetails} className="bg-pink-300 px-7 py-5 rounded-lg">
        Get User Details
      </button>
    </div>
  );
}
