"use client";

import Navbar from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AuthProvider } from "./AuthProvider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isRootPath = pathname === "/";

  return (
    <AuthProvider>
      {isRootPath ? (
        // 루트 경로(/)일 때는 사이드바 없이 렌더링
        children
      ) : (
        // 다른 모든 경로에서는 사이드바 프로바이더 적용
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <Navbar />
            <div className="px-4 sm:px-6 lg:px-8 py-4">{children}</div>
          </main>
        </SidebarProvider>
      )}
    </AuthProvider>
  );
}
