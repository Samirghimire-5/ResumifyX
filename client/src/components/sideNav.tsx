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
  Moon,
  Sun,
} from "lucide-react";
import { PiHammer } from "react-icons/pi";
import { LuFileStack } from "react-icons/lu";

import { TbLayoutDashboard, TbRobot } from "react-icons/tb";
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
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToogle";

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(pathname);
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
      toast.error("Failed to logout. Please try again.");
    }
  };

  const pages = [
    {
      title: "Dashboard",
      url: "/resume",
      icon: TbLayoutDashboard,
      description: "Welcome to your dashboard",
    },
    {
      title: "Builder",
      url: "/resume/builder",
      icon: PiHammer,
      description: "Build your resume",
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LuFileStack,
      description: "Browse resume templates",
    },
    {
      title: "Ai Resume",
      url: "/aiResume",
      icon: TbRobot,
      description: "Create your resume with AI",
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 border-none text-white"
    >
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-white/10 bg-transparent">
        <div
          className={cn(
            "flex items-center w-full relative",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          <Link
            href="/resume"
            className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center  transition-all"
          >
            <Image
              src="/resumifyX.svg"
              height={32}
              width={32}
              alt="resumifyX logo"
              className="object-cover"
              priority
            />
          </Link>

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="absolute right-0 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <PanelLeftClose size={20} />
            </Button>
          )}
        </div>
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
      <SidebarContent className="py-4 flex flex-col h-full">
        <SidebarGroup className="group-data-[collapsible=icon]:p-0">
          <SidebarMenu className="space-y-3 px-2">
            {pages.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`${isActive ? "bg-b1 text-text" : ""} hover:bg-b3 transition-all duration-300`}
                  >
                    <Link
                      href={item.url}
                      className={isCollapsed ? "justify-center" : ""}
                    >
                      <item.icon size={22} className={`shrink-0`} />
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
              className={`w-full flex items-center p-2 h-auto ${
                isCollapsed
                  ? "justify-center hover:bg-transparent"
                  : "justify-start hover:bg-white/10"
              }`}
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

            {/* theme toogler */}
            <ThemeToggle />
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNav;
