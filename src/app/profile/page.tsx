"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [data,setData]= useState('nothing')

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async()=>{
   const res =  await axios.get('/api/users/me')
   console.log(res.data);
   setData(res.data.data._id)
  }
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <p>Profile page </p>
      <h2>
  {data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>Go to your profile{data} </Link>}
</h2>

      <button
        onClick={logout}
        className=" mt-10 bg-blue-400  hover:bg-blue-500 text-white font-bold py-2 px-4 rounded hover:rounded-2xl hover:pb-2"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className=" mt-10 bg-blue-400  hover:bg-blue-500 text-white font-bold py-2 px-4 rounded hover:rounded-2xl hover:pb-2"
      >
        details
      </button>
      
    </div>
  );
}
