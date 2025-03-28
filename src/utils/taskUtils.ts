// utils/taskUtils.ts
import { User } from "@/types/user";

// 사용자 역할에 따라 할당 가능한 사용자 목록 필터링
export const getAssignableUsers = (
  currentUser: User,
  userList: User[]
): User[] => {
  switch (currentUser.userRole) {
    case "Admin":
      return userList; // 모든 사용자에게 할당 가능
    case "PrimeUser":
      return userList.filter(
        (user) =>
          user.userRole === "PrimeUser" ||
          user.userRole === "RegularUser" ||
          user.userRole === "Viewer"
      );
    case "RegularUser":
      return [currentUser]; // 본인에게만 할당 가능
    default:
      return [];
  }
};

// 기본값 생성 함수
export const getDefaultValues = (currentUser: User) => ({
  reporter: currentUser.userName,
  taskName: "",
  assignee: "",
  taskType: "물품 구매" as const,
  content: "",
  itemName: "",
  itemCount: "",
  recipientName: "",
  recipientPhone: "+82 010-",
  recipientAddress: "",
  dueDate: new Date(),
});
