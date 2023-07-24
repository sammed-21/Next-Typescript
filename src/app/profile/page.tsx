"use client";
import axios from "axios";
import Link from "next/link";
import Loader from "@/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";

export default function profilPage() {
   
  const router = useRouter();
  const [data, setData] = useState({id:"",email:""});
  // const [userEmail, setUserEmail] = useState();
  const logout = async () => {
      try {
          await axios.get("/api/users/logout")
          router.push("/login")
          toast.success("logout successful")
    } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
    }
  };

  const getUserDetails = async () => {
    const res = await axios('/api/users/me');
    console.log(res.data);
    // setUserEmail(res.data.data.email);
    setData({
      id: res.data.data._id,
      email:res.data.data.email
    });
    // setData(res.data.data._id);
  }
  return (
    <div className="flex flex-col min-h-[100vh] w-full justify-center py-6 items-center text-pink-200 ">
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h1>this is a profile page </h1>
    
      {/* <h2 className='bg-green-500 py-3 text-white '>{data ?  <Link href={`profile/${data}`}>{data}</Link>:"nothing"}</h2> */}
      <h2 className='bg-green-500 py-3 text-white '>{data: === 'nothing' ? "Nothing" : <Link href={`profile/${data}`}>{data.id}</Link>}</h2>
      <button onClick={logout} className="bg-blue-600 p-3">
        logout
      </button>
      <button onClick={getUserDetails} className="bg-pink-300 px-7 py-5 rounded-lg" >
        getUserDetails
      </button>
      

    </div>
  );
}
