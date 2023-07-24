"use client"

import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified,setVerified]=useState(false);

    const [error,setError] = useState(false);
    
    const verifyUserEmail = async ()=>{
        try{
           await axios.post('api/users/verifyemail',{token})
            setVerified(true);
        }catch(error:any){
            setError(true)
            console.log(error.message.data);
        }
    }
    useEffect(() => {
        const urlToken= window.location.search.split("=")
        [1];
        setToken(urlToken || "");
    },[])
    useEffect(() => {
        
        
if(token.length>0){
    verifyUserEmail();
}
    },[token])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className="text-4">Verify Your Email</h1>
            <h2 className='p-3 bg-pink-500 text-white'>{token ? `${token}` : "no token"}</h2>
            {verified && (
                <div>
                    <h2 className="text-2xl">
                        Email Verified 🚀✅
                        <br/>
                        <Link href="/login" className='bg-green-400 text-black'>
                            Login
                            </Link>
                    </h2>
                    </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl text-white">
                        Email Verified
                        <br/>
                        <Link href="/login" className='bg-red-300'>
                            Login
                            </Link>
                    </h2>
                    </div>
            )}
        </div>
    )
}
