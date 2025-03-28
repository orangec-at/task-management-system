import { UserListContainer } from "@/components/users/UserListContainer";
import users from "@/data/user_list.json";
import { User } from "@/types/user";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <UserListContainer
        initialUsers={(users as User[]).map((i) => ({
          ...i,
          id: i.userName,
        }))} // Add unique ID to each user
      />
    </div>
  );
}
