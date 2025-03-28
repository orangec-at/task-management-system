"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user";

interface UserListTableProps {
  users: User[];
  selectedUsers: string[];
  sortConfig: {
    key: keyof User | null;
    direction: "ascending" | "descending" | null;
  };
  onSort: (key: keyof User) => void;
  onToggleSelection: (userId: string) => void;
  onToggleAll: (checked: boolean) => void;
  canEdit: boolean; // Admin과 PrimeUser만 편집 가능
  isRegularUser: boolean; // 본인에 대한 정보만 볼 수 있음
  isMenuDisabled: boolean; // 메뉴 접근 금지
}

export function UserListTable({
  users,
  sortConfig,
  onSort,
  isRegularUser,
  isMenuDisabled,
}: UserListTableProps) {
  const { currentUser } = useAuth();

  // 날짜 형식 변환 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/, /g, " ");
  };

  // 정렬 화살표 렌더링
  const renderSortArrow = (key: keyof User) => {
    if (sortConfig.key !== key) {
      return null;
    }

    return sortConfig.direction === "ascending" ? " ↑" : " ↓";
  };

  // RegularUser인 경우 본인 정보만 필터링
  const displayUsers =
    isRegularUser && currentUser
      ? users.filter((user) => user.userEmail === currentUser.userEmail)
      : users;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead
              className={`${
                !isMenuDisabled ? "cursor-pointer" : ""
              } text-center`}
              onClick={() => !isMenuDisabled && onSort("userName")}
            >
              User Name {renderSortArrow("userName")}
            </TableHead>
            <TableHead
              className={`${
                !isMenuDisabled ? "cursor-pointer" : ""
              } text-center`}
              onClick={() => !isMenuDisabled && onSort("userEmail")}
            >
              User Email {renderSortArrow("userEmail")}
            </TableHead>
            <TableHead
              className={`${
                !isMenuDisabled ? "cursor-pointer" : ""
              } text-center`}
              onClick={() => !isMenuDisabled && onSort("userRole")}
            >
              User Role {renderSortArrow("userRole")}
            </TableHead>
            <TableHead
              className={`${
                !isMenuDisabled ? "cursor-pointer" : ""
              } text-center`}
              onClick={() => !isMenuDisabled && onSort("userPhone")}
            >
              User Phone {renderSortArrow("userPhone")}
            </TableHead>
            <TableHead
              className={`${
                !isMenuDisabled ? "cursor-pointer" : ""
              } text-center`}
              onClick={() => !isMenuDisabled && onSort("createdAt")}
            >
              Created At {renderSortArrow("createdAt")}
            </TableHead>
            <TableHead
              className={`${
                !isMenuDisabled ? "cursor-pointer" : ""
              } text-center`}
              onClick={() => !isMenuDisabled && onSort("lastLoggedInAt")}
            >
              Last Logged In At {renderSortArrow("lastLoggedInAt")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayUsers.length > 0 ? (
            displayUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.userName}</TableCell>
                <TableCell>{user.userEmail}</TableCell>
                <TableCell>{user.userRole}</TableCell>
                <TableCell>{user.userPhone}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>{formatDate(user.lastLoggedInAt)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
