// components/task/CommonFields.tsx
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormValues, TaskType } from "@/types/task-form";
import { User } from "@/types/user";
import { Control } from "react-hook-form";

interface CommonFieldsProps {
  control: Control<FormValues>;
  currentUser: User;
  assignableUsers: User[];
  taskType: TaskType;
  setTaskType: (type: TaskType) => void;
}

export function CommonFields({
  control,
  assignableUsers,
  setTaskType,
}: CommonFieldsProps) {
  return (
    <>
      {/* 생성자 필드 */}
      <FormField
        control={control}
        name="reporter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>생성자</FormLabel>
            <FormControl>
              <Input {...field} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Task 이름 필드 */}
      <FormField
        control={control}
        name="taskName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task Name</FormLabel>
            <FormControl>
              <Input placeholder="Task 이름을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 담당자 필드 */}
      <FormField
        control={control}
        name="assignee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>담당자 지정</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="담당자 선택" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {assignableUsers.map((user) => (
                  <SelectItem key={user.userName} value={user.userName}>
                    {user.userName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Task 타입 필드 */}
      <FormField
        control={control}
        name="taskType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task Type</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setTaskType(value as TaskType);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Task 유형 선택" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="물품 구매">물품 구매</SelectItem>
                <SelectItem value="택배 요청">택배 요청</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 내용 필드 */}
      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>내용</FormLabel>
            <FormControl>
              <Textarea placeholder="내용을 입력해주세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
