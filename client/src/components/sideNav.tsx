"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";

const SideNav = () => {
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-2xl text-black mb-3">ResumifyX</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 font-medium">
              {pages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-gray-200">
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
    </Sidebar>
  );
};

export default SideNav;
