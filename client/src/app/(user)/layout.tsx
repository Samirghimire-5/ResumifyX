"use client"
import SideNav from "@/components/sideNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserFetcher from "@/components/userFetcher";


export default function Layout({ children }: any) {
  return (
    <SidebarProvider>
      <SideNav />
      <main className="flex gap-5 w-[100%]">
        <SidebarTrigger/>
        <div className="flex-1 w-[100%]">
         {children} 
        </div>
      </main>
    </SidebarProvider>
  );
}
