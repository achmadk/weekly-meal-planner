"use client"

import { PropsWithChildren, useState } from "react";
import { AuthGuard } from "../auth/auth-guard";
import { DashboardSideMenu } from "../navigation/DashboardSideMenu";

export function DashboardLayout({ children }: PropsWithChildren) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  return (
    <AuthGuard>
        <DashboardSideMenu {...{ isSidebarCollapsed, setIsSidebarCollapsed }} />
        <div
          id="dashboard-content"
          className={`px-2 sm:px-4 py-6 sm:py-8 ${isSidebarCollapsed ? 'lg:ml-20 lg:max-w-[calc(100vw-5rem)]' : 'lg:ml-64 lg:max-w-[calc(100vw-16rem)]'}`}
        >
            {children}
        </div>
    </AuthGuard>
  )
}