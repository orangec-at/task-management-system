"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserListHeaderProps {
  searchTerm: string;
  searchField: string;
  onSearchChange: (value: string) => void;
  onSearchFieldChange: (value: string) => void;
  onInviteClick: () => void;
  inviteButtonEnabled: boolean; // Admin과 PrimeUser만 초대 버튼 표시
  inviteButtonDisabled: boolean; // PrimeUser는 초대 버튼 비활성화
}

export function UserListHeader({
  searchTerm,
  searchField,
  onSearchChange,
  onSearchFieldChange,
  onInviteClick,
  inviteButtonEnabled,
  inviteButtonDisabled,
}: UserListHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
        <Select value={searchField} onValueChange={onSearchFieldChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="User Name" />
          </SelectTrigger>
          <SelectContent>
            {/* 아래 옵션들을 변경해서 해당 column에 해당되는 값을 검색 할 수 있다. */}
            <SelectItem value="userName">User Name</SelectItem>
            <SelectItem value="userEmail">User Email</SelectItem>
            <SelectItem value="userPhone">User Phone</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full md:w-[300px] pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {/* Admin과 PrimeUser만 초대 버튼이 보이도록 설정 */}
        {inviteButtonEnabled && (
          <Button
            variant="default"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={onInviteClick}
            disabled={inviteButtonDisabled} // PrimeUser는 버튼 비활성화
          >
            Invite User
          </Button>
        )}
      </div>
    </div>
  );
}
