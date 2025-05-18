"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { LogOut, FileText, LayoutGrid, FileUser, FileSpreadsheetIcon } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar, SidebarContent } from "./ui/sidebar";
import { useDispatch } from "react-redux";
import { logOut } from "@/lib/redux/user/userSlice";

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(logOut());
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const pages = [
    {
      title: "Dashboard",
      url: "/resume",
      icon: LayoutGrid,
      description: "Welcome to your dashboard",
    },
    {
      title: "Builder",
      url: "/resume/builder",
      icon: FileSpreadsheetIcon,
      description: "Build your resume",
    },
    {
      title: "Templates",
      url: "/templates",
      icon: FileText,
      description: "Browse resume templates",
    },
    {
      title: "Ai Resueme",
      url: "/aiResume",
      icon: FileUser,
      description: "Create your resume with the help of AI",
    },
  ];

  return (
    <Sidebar className="h-screen w-56">
      <SidebarContent className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-4 flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex justify-center mb-6 px-6">
          <Link href="/resume">
            <Image
              src="/resumifyx-logo.svg"
              height={100}
              width={250}
              alt="resumifyX logo"
              priority
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow px-4 space-y-2">
          {pages.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={`group block w-full rounded-lg transition-all duration-300 ${
                pathname === item.url
                  ? "bg-white/20 backdrop-blur-sm"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center p-3 space-x-4 text-white rounded-lg">
                <item.icon
                  className={`text-white/70 group-hover:text-white transition-colors duration-300 ${
                    pathname === item.url ? "text-white" : ""
                  }`}
                  size={22}
                />
                <div className="flex-grow">
                  <div className="text-[16px] font-semibold group-hover:text-white/90 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                    {item.description}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50 group-hover:text-white">
                  →
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Logout Footer */}
        <div className="px-4 pt-6 mt-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 transition-all duration-300 hover:bg-white/20">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full text-white flex items-center justify-center gap-3 hover:bg-transparent"
            >
              <LogOut size={20} className="text-white/70" />
              <span className="text-[16px] font-medium">Logout</span>
            </Button>
            <p className="text-xs text-white/50 mt-2 transition-colors group-hover:text-white/70">
              Secure logout from your account
            </p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideNav;
