"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: boolean;
  isPrimeUser: boolean;
  isRegularUser: boolean;
  isViewer: boolean;
  canCreateTask: boolean;
  canViewAllUsers: boolean;
  canViewAllTasks: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  // 로그인 데이터 있을 경우, 로컬스토리지에서 가져오기
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));

    // 뷰어는 tasks 페이지로 이동
    if (user.userRole === "Viewer") {
      router.push("/tasks");
      return;
    }
    router.push("/users");
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  // Role-based flags
  const isAdmin = currentUser?.userRole === "Admin";
  const isPrimeUser = currentUser?.userRole === "PrimeUser";
  const isRegularUser = currentUser?.userRole === "RegularUser";
  const isViewer = currentUser?.userRole === "Viewer";

  // Permission flags
  const canCreateTask = isAdmin || isPrimeUser || isRegularUser;
  const canViewAllUsers = isAdmin || isPrimeUser;
  const canViewAllTasks = isAdmin || isPrimeUser;

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    isPrimeUser,
    isRegularUser,
    isViewer,
    canCreateTask,
    canViewAllUsers,
    canViewAllTasks,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
