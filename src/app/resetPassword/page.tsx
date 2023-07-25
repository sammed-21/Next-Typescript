"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Loading from "@/components/Loader"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    
      password: "",
      confirmPassword: "",
      token:""
    
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (
 
      user.password.length > 0 &&
      user.confirmPassword.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.password, user.confirmPassword]);
  useEffect(() => {
    const urlToken:any= window.location.search.split("=")
    [1];
    setUser((prev)=>({...prev,token:urlToken}));
},[])
  const confirmPass = async () => {
    try {
      setLoading(true);
      console.log('sighnup')
      const response = await axios.post('/api/users/forgotPassword', user)
      console.log(response.data)
      router.push("/login");
      setLoading(false)
    } catch (error: any) {
      console.log("signup failed"+error.message);
      
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white ">
      <div className="flex flex-col  items-center justify-center text-black rounded-lg px-4 py-2 bg-white shadow-xl border-gray-700">
        <h1>{loading ? <Loading /> : "signUp"}</h1>
        <hr />
      
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        />
        <label htmlFor="password">confirm-password</label>
        <input
          type="password"
          id="password"
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          placeholder="confirm password"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        />
        <button
          type="button"
          onClick={confirmPass}
          className="border border-l-gray-600 p-2 rounded-lg bg-black text-white"
        >
          {buttonDisabled ? "empty field" : "send"}
        </button>
        <Link href="/login">visit login page</Link>
      </div>
    </div>
  );
}
