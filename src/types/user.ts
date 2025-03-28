// types/user.ts

export interface User {
  userName: string;
  userPhone: string;
  userEmail: string;
  userRole: UserRole;
  createdAt: string;
  lastLoggedInAt: string;
  id: string;
}

export type UserRole = "Admin" | "RegularUser" | "Viewer" | "PrimeUser";
