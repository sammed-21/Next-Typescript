"use client";
import React from "react";
import Link from "next/link";
import Loading from "@/components/Loader"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSignup = async () => {
    try {
      setLoading(true);
      console.log('sighnup')
      const response = await axios.post('/api/users/signup', user)
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
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        />
        <hr />

        <label htmlFor="email">email</label>
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
          type="button"
          onClick={onSignup}
          className="border border-l-gray-600 p-2 rounded-lg bg-black text-white"
        >
          {buttonDisabled ? "no signup" : "signUp"}
        </button>
        <Link href="/login">visit login page</Link>
      </div>
    </div>
  );
}
