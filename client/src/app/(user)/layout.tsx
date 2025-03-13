"use client"

import SideNav from "@/components/sideNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function Layout({ children }: any) {
  return (
    <SidebarProvider>
      <SideNav />
      <main className="flex gap-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
