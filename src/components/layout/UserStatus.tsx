"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/AuthProvider";

const UserStatus = () => {
  const { currentUser, logout } = useAuth();

  const getUserInitials = () => {
    if (!currentUser || !currentUser.userName) return "?";
    return currentUser.userName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (!currentUser) {
    return (
      <Button variant="outline" asChild>
        <a href="/login">로그인</a>
      </Button>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-2">
      <Badge>{currentUser.userRole}</Badge>
      <Badge>{currentUser.userName}</Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full hover:cursor-pointer"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {currentUser.userName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser.userEmail || "이메일 없음"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive">
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserStatus;
