import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import Header from "./header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
