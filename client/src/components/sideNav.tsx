"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";


const SideNav = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:8000/api/dashboard")
    .then(response => setUser(response.data.user))
    .catch(error => console.log("error", error))
  }, [])


  const handleLogout = async () => {
    const response = await axios.post("http://localhost:8000/api/logout", user, { withCredentials: true })
    if (!response) {
      toast.error("Something went wrong");
    }
    try {
      if (response.status == 200) toast.success(response.data.message)
      router.push("/login")
    } catch (error) {
      console.log("error", error)
    }
  }

  const pages = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "🏠",
    },
    {
      title: "Templates",
      url: "/templates",
      icon: "📄",
    },
    {
      title: "Resume Builder",
      url: "/resume",
      icon: "🛠️",
    },
    {
      title: "Examples",
      url: "examples",
      icon: "📋",
    },
    {
      title: "Settings",
      url: "#",
      icon: "⚙️",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
        <SidebarGroup>
          <SidebarGroupLabel className=" mb-8 h-20 shadow-sm shadow-amber-300"><Image src={"/resumifyx-logo.svg"} height={100} width={220} alt="resumifyX logo"/></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2 h-12">
                  <SidebarMenuButton asChild className="h-full w-full font-semibold text-[19px] text-white shadow-sm shadow-orange-300 hover:bg-blue-800">
                    <Link href={item.url}>
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="flex flex-row items-center justify-center h-20 bg-indigo-900">
       <Button onClick={() => handleLogout()}>
        <LogOut />
        <p>Logout</p>
       </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNav;
