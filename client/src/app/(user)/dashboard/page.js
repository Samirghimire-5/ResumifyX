"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Dashboard = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user)
      })
      .catch((error) => console.log("error", error));
  }, []);

  const logOut = async () => {
   const response = await axios.post("http://localhost:8000/api/logout", user, {withCredentials: true})
    if (!response) return console.log("gayo")
    try{
  if (response.status === 200)
    toast.success(response.data.message)
    router.push("/login")
} catch(error) {
    console.log(error)
  }
  }
  return (
    <div className="bg-white flex gap-4">
      <div className="flex flex-col items-center gap-3 font-bold font-mono text-2xl">
        {user ? 
        <div>
          username
          <section className="border p-4 bg-amber-800">{user.username}</section>
          email
          <section className="border p-4 bg-amber-800">{user.email}</section> 
        </div>
        : <p>User Not found</p>}
      </div>

      <div className="flex items-center h-10 p-2 border "
      onClick={() => logOut()}>
        <LogOut /> logout
      </div>
    </div>
  );
};

export default Dashboard;
