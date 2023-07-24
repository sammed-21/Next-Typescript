"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loader";
export default function LoginPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
        setLoading(true);
        console.log("this is true")
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    
      toast.success("login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white ">
      <div className="flex flex-col  items-center justify-center text-black rounded-lg px-4 py-2 bg-white shadow-xl border-gray-700">
        <h1>{loading ? <Loading /> : "Login"}</h1>
        <hr />

        <label htmlFor="email" className="flex ">
          email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        />
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
        <button
          onClick={onLogin}
          className="border border-l-gray-600 p-2 rounded-lg bg-black text-white"
        >
          Login here
        </button>
        <Link href="/signup">visit sign page</Link>
      </div>
    </div>
  );
}
