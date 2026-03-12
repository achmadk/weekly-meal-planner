import { DashboardLayout } from "@/components/layouts/Dashboard";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return <DashboardLayout>{children}</DashboardLayout>
}