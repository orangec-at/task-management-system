"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Task } from "@/types/task";
import { useState } from "react";
import { TaskCountBadge } from "./TaskCountBadge";
import { TaskListFilters } from "./TaskListFilters";
import { TaskListHeader } from "./TaskListHeader";
import { TaskListTable } from "./TaskListTable";
import users from "@/data/user_list.json";
import { User } from "@/types/user";
import { TaskModal } from "@/components/tasks/TaskModal";

const userList = users.map((i) => ({
  ...i,
  id: i.userName,
})) as User[];

interface TaskListContainerProps {
  initialTasks: Task[];
}

export function TaskListContainer({ initialTasks }: TaskListContainerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentUser, isAdmin, isPrimeUser, isRegularUser, isViewer } =
    useAuth();

  // 사용자 권한에 따른 태스크 필터링
  const getFilteredInitialTasks = () => {
    if (isAdmin || isPrimeUser) {
      // Admin과 PrimeUser는 모든 태스크 볼 수 있음
      return initialTasks;
    } else if (isRegularUser) {
      // RegularUser는 본인이 생성한 태스크만 볼 수 있음
      return initialTasks.filter(
        (task) => currentUser && task.reporter === currentUser.userName
      );
    } else if (isViewer) {
      // Viewer는 본인에게 할당된 태스크만 볼 수 있음
      return initialTasks.filter(
        (task) => currentUser && task.assignee === currentUser.userName
      );
    }
    return initialTasks;
  };

  const filteredInitialTasks = getFilteredInitialTasks();

  // 상태 관리
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("taskName");

  // 고유한 Task Type 목록 추출
  const uniqueTaskTypes = Array.from(
    new Set(filteredInitialTasks.map((task) => task.taskType))
  );
  const defaultTaskTypeFilters = ["ALL", ...uniqueTaskTypes];
  const [selectedTaskTypes, setSelectedTaskTypes] = useState<string[]>(
    defaultTaskTypeFilters
  );

  // 고유한 상태 목록 추출
  const uniqueStatuses = Array.from(
    new Set(filteredInitialTasks.map((task) => task.status))
  );
  const defaultStatusFilters = ["ALL", ...uniqueStatuses];
  const [selectedStatuses, setSelectedStatuses] =
    useState<string[]>(defaultStatusFilters);

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Task | null;
    direction: "ascending" | "descending" | null;
  }>({
    key: null,
    direction: null,
  });

  // 정렬 처리 함수
  const handleSort = (key: keyof Task) => {
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

  // 정렬된 태스크 목록
  const filteredTasks = [...filteredInitialTasks].filter((task) => {
    // 검색어 필터링
    if (searchTerm) {
      const searchValue =
        task[searchField as keyof Task]?.toString().toLowerCase() || "";
      if (!searchValue.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }

    // Task Type 필터링
    if (
      !selectedTaskTypes.includes("ALL") &&
      !selectedTaskTypes.includes(task.taskType)
    ) {
      return false;
    }

    // 상태 필터링
    if (
      !selectedStatuses.includes("ALL") &&
      !selectedStatuses.includes(task.status)
    ) {
      return false;
    }

    return true;
  });

  // 정렬 적용
  const sortedTasks = [...filteredTasks];
  if (sortConfig.key && sortConfig.direction) {
    sortedTasks.sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  // Task Type 필터 토글
  const toggleTaskTypeFilter = (taskType: string) => {
    if (taskType === "ALL") {
      // ALL 토글 시 모두 선택하거나 모두 해제
      if (selectedTaskTypes.includes("ALL")) {
        setSelectedTaskTypes([]);
      } else {
        setSelectedTaskTypes(defaultTaskTypeFilters);
      }
    } else {
      if (selectedTaskTypes.includes(taskType)) {
        // 타입 제거
        const newSelectedTypes = selectedTaskTypes.filter(
          (t) => t !== taskType
        );
        // ALL도 제거
        if (selectedTaskTypes.includes("ALL")) {
          newSelectedTypes.splice(newSelectedTypes.indexOf("ALL"), 1);
        }
        setSelectedTaskTypes(newSelectedTypes);
      } else {
        // 타입 추가
        const newSelectedTypes = [...selectedTaskTypes, taskType];
        // 모든 타입이 선택되었으면 ALL도 추가
        if (
          !newSelectedTypes.includes("ALL") &&
          uniqueTaskTypes.every((type) => newSelectedTypes.includes(type))
        ) {
          newSelectedTypes.push("ALL");
        }
        setSelectedTaskTypes(newSelectedTypes);
      }
    }
  };

  // 상태 필터 토글
  const toggleStatusFilter = (status: string) => {
    if (status === "ALL") {
      // ALL 토글 시 모두 선택하거나 모두 해제
      if (selectedStatuses.includes("ALL")) {
        setSelectedStatuses([]);
      } else {
        setSelectedStatuses(defaultStatusFilters);
      }
    } else {
      if (selectedStatuses.includes(status)) {
        // 상태 제거
        const newSelectedStatuses = selectedStatuses.filter(
          (s) => s !== status
        );
        // ALL도 제거
        if (selectedStatuses.includes("ALL")) {
          newSelectedStatuses.splice(newSelectedStatuses.indexOf("ALL"), 1);
        }
        setSelectedStatuses(newSelectedStatuses);
      } else {
        // 상태 추가
        const newSelectedStatuses = [...selectedStatuses, status];
        // 모든 상태가 선택되었으면 ALL도 추가
        if (
          !newSelectedStatuses.includes("ALL") &&
          uniqueStatuses.every((s) => newSelectedStatuses.includes(s))
        ) {
          newSelectedStatuses.push("ALL");
        }
        setSelectedStatuses(newSelectedStatuses);
      }
    }
  };

  // 태스크 선택 토글
  const toggleTaskSelection = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  // 모든 태스크 선택/해제 토글
  const toggleAllTasks = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(sortedTasks.map((task) => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  // 태스크 생성 버튼 클릭 핸들러
  const handleCreateTaskClick = () => {
    console.log("태스크 생성 버튼 클릭됨");
    setIsModalOpen(true);
  };

  return (
    <>
      <TaskListHeader
        searchTerm={searchTerm}
        searchField={searchField}
        onSearchChange={setSearchTerm}
        onSearchFieldChange={setSearchField}
        onCreateTaskClick={handleCreateTaskClick}
        // Admin, PrimeUser, RegularUser는 버튼 활성화, Viewer는 버튼 비활성화
        createButtonEnabled={isAdmin || isPrimeUser || isRegularUser}
        createButtonDisabled={isViewer}
      />

      <TaskCountBadge totalCount={sortedTasks.length} />

      <TaskListFilters
        selectedTaskTypes={selectedTaskTypes}
        availableTaskTypes={defaultTaskTypeFilters}
        onToggleTaskType={toggleTaskTypeFilter}
        selectedStatuses={selectedStatuses}
        availableStatuses={defaultStatusFilters}
        onToggleStatus={toggleStatusFilter}
      />

      <TaskListTable
        tasks={sortedTasks}
        selectedTasks={selectedTasks}
        sortConfig={sortConfig}
        onSort={handleSort}
        onToggleSelection={toggleTaskSelection}
        onToggleAll={toggleAllTasks}
      />

      {currentUser && (
        <TaskModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          currentUser={currentUser}
          userList={userList}
        />
      )}
    </>
  );
}
