"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { UserListFilters } from "./UserListFilters";
import { UserListTable } from "./UserListTable";
import { UserListHeader } from "./UserListHeader";
import { UserRoleBadge } from "./UserRoleBadge";
import { useAuth } from "@/components/providers/AuthProvider";

interface UserListContainerProps {
  initialUsers: User[];
}

export function UserListContainer({ initialUsers }: UserListContainerProps) {
  const { isAdmin, isPrimeUser, isViewer } = useAuth();

  // 뷰어는 뷰어 권한만 볼 수 있음
  const filteredInitialUsers = isViewer
    ? initialUsers.filter((user) => user.userRole === "Viewer")
    : initialUsers;

  // 상태 관리
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("userName");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    "ALL",
    "Admin",
    "PrimeUser",
    "RegularUser",
    "Viewer",
  ]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: "ascending" | "descending" | null;
  }>({
    key: null,
    direction: null,
  });

  // 처음 로드 시 뷰어이면 Viewer 역할만 선택하도록 설정
  useEffect(() => {
    if (isViewer) {
      setSelectedRoles(["Viewer"]);
    }
  }, [isViewer]);

  // 정렬 처리 함수
  const handleSort = (key: keyof User) => {
    let direction: "ascending" | "descending" | null = "ascending";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  // 정렬된 사용자 목록
  const sortedUsers = [...filteredInitialUsers].filter((user) => {
    // 사용자 권한이 보여지는데 filter에 보여지는 옵션값은 고정값이 아니고,
    // 응답 값 내에 존재하는 권오로만 구성이 된다.

    // 검색어 필터링
    if (searchTerm) {
      const searchValue =
        user[searchField as keyof User]?.toString().toLowerCase() || "";
      if (!searchValue.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }

    // 역할 필터링 (ALL이 선택되었거나 해당 역할이 선택된 경우)
    if (
      !selectedRoles.includes("ALL") &&
      !selectedRoles.includes(user.userRole)
    ) {
      return false;
    }

    return true;
  });

  // 정렬 적용
  if (sortConfig.key && sortConfig.direction) {
    sortedUsers.sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  // JSON배열을 가지고 추가 기능을 구현한다.
  // 권한별 고유한 역할 목록 추출
  const uniqueRoles = Array.from(
    new Set(filteredInitialUsers.map((user) => user.userRole))
  );
  // ALL 옵션 추가
  const availableRoles = ["ALL", ...uniqueRoles];

  // 역할 필터 토글
  const toggleRoleFilter = (role: string) => {
    // 뷰어는 필터를 변경할 수 없음
    if (isViewer) return;

    if (role === "ALL") {
      // ALL 토글 시 모두 선택하거나 모두 해제
      if (selectedRoles.includes("ALL")) {
        setSelectedRoles([]);
      } else {
        setSelectedRoles(availableRoles);
      }
    } else {
      if (selectedRoles.includes(role)) {
        // 역할 제거
        const newSelectedRoles = selectedRoles.filter((r) => r !== role);
        // ALL도 제거
        if (selectedRoles.includes("ALL")) {
          newSelectedRoles.splice(newSelectedRoles.indexOf("ALL"), 1);
        }
        setSelectedRoles(newSelectedRoles);
      } else {
        // 역할 추가
        const newSelectedRoles = [...selectedRoles, role];
        // 모든 역할이 선택되었으면 ALL도 추가
        if (
          !newSelectedRoles.includes("ALL") &&
          uniqueRoles.every((role) => newSelectedRoles.includes(role))
        ) {
          newSelectedRoles.push("ALL");
        }
        setSelectedRoles(newSelectedRoles);
      }
    }
  };

  // 사용자 선택 토글
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // 모든 사용자 선택/해제 토글
  const toggleAllUsers = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(sortedUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // 초대하기 버튼 클릭 핸들러
  const handleInviteClick = () => {
    console.log("사용자 초대 버튼 클릭됨");
    // 여기에 사용자 초대 모달을 여는 로직 추가
  };

  return (
    <>
      <UserListHeader
        searchTerm={searchTerm}
        searchField={searchField}
        onSearchChange={setSearchTerm}
        onSearchFieldChange={setSearchField}
        onInviteClick={handleInviteClick}
        // Admin과 PrimeUser만 초대 버튼 활성화
        inviteButtonEnabled={isAdmin || isPrimeUser}
        // PrimeUser는 초대 버튼 비활성화 설정
        inviteButtonDisabled={isPrimeUser}
      />

      <UserRoleBadge totalCount={sortedUsers.length} />

      <UserListFilters
        selectedRoles={selectedRoles}
        availableRoles={availableRoles}
        onToggleRole={toggleRoleFilter}
        isDisabled={isViewer}
      />

      <UserListTable
        users={sortedUsers}
        selectedUsers={selectedUsers}
        sortConfig={sortConfig}
        onSort={handleSort}
        onToggleSelection={toggleUserSelection}
        onToggleAll={toggleAllUsers}
        // 수정할 수 있는 권한 전달
        canEdit={isAdmin || isPrimeUser}
        // 본인이 대한 정보만 볼 수 있음 (RegularUser)
        isRegularUser={!isAdmin && !isPrimeUser && !isViewer}
        // 메뉴 접근 금지 (비활성화 되어, 리스트에 대한 접근이 불가함)
        isMenuDisabled={isViewer}
      />
    </>
  );
}
