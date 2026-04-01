"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LogOut,
  FileText,
  LayoutGrid,
  FileUser,
  FileSpreadsheetIcon,
  PanelLeftClose,
  PanelRightClose,
  Settings,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  useSidebar,
} from "./ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/lib/redux/user/userSlice";
import api from "@/axios/api";

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const user = useSelector((state: any) => state.userData.userCredentials);

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/user/logout");

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(logOut());
        router.push("/");
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
      title: "Ai Resume",
      url: "/aiResume",
      icon: FileUser,
      description: "Create your resume with AI",
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 border-none text-white"
    >
      {/* Header */}
      <SidebarHeader className="flex flex-row items-center justify-between p-4 bg-transparent border-white/10">
        <Link
          href="/resume"
          className={`flex items-center transition-all ${isCollapsed ? "justify-center w-full" : ""}`}
        >
          <Image
            src="/resumifyX.svg"
            height={32}
            width={32}
            alt="resumifyX logo"
            className="object-contain rounded-full"
            priority
          />
        </Link>

        {/* Toggle inside header right */}
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white/70 hover:bg-white/10 hover:text-white shrink-0"
          >
            <PanelLeftClose size={20} />
          </Button>
        )}
      </SidebarHeader>

      {/* Put a toggle when collapsed directly below header if desired, or just keep it in header */}
      {isCollapsed && (
        <div className="flex justify-center mt-2 pb-2 border-b border-white/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white/70 hover:bg-white/10 hover:text-white"
          >
            <PanelRightClose size={20} />
          </Button>
        </div>
      )}

      {/* Main Content */}
      <SidebarContent className="px-2 py-4 flex flex-col h-full">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {pages.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`transition-all duration-300`}
                  >
                    <Link
                      href={item.url}
                      className={isCollapsed ? "justify-center" : ""}
                    >
                      <item.icon
                        size={22}
                        className={`shrink-0 ${isActive ? "text-white" : ""}`}
                      />
                      {!isCollapsed && (
                        <div className="flex-grow flex items-center">
                          <span className="text-[15px] font-semibold">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer / Profile Section */}
      <SidebarFooter className="p-3 bg-white/5 border-t border-white/10 mt-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full flex items-center p-2 h-auto hover:bg-white/10 ${isCollapsed ? "justify-center" : "justify-start"}`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-500 shrink-0 flex items-center justify-center">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                ) : (
                  <User size={18} className="text-white" />
                )}
              </div>

              {!isCollapsed && (
                <div className="ml-3 flex flex-col items-start overflow-hidden">
                  <span className="text-sm font-medium text-white truncate w-32">
                    {user?.firstName || "User"}
                  </span>
                  <span className="text-xs text-white/50 truncate w-32">
                    {user?.email || "email@example.com"}
                  </span>
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="end"
            className="w-56 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 p-2 shadow-xl m-2"
          >
            <div className="flex items-center space-x-2 p-2 border-b border-zinc-100 dark:border-zinc-800 mb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-500 shrink-0 flex items-center justify-center">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <User size={20} className="text-white" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium dark:text-white">
                  {user?.firstName || "User"}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate w-32">
                  {user?.email || "email@example.com"}
                </span>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 gap-2 !p-2 h-auto"
            >
              <LogOut size={16} />
              <span className="text-sm font-medium">Log out</span>
            </Button>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNav;
