import { z } from "zod";
import { User } from "@/types/user";

// Task 타입 정의
export type TaskType = "물품 구매" | "택배 요청";

// Task 모달 속성
export interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: User;
  userList: User[];
}

// FormValues 인터페이스 정의
export interface FormValues {
  reporter: string;
  taskName: string;
  assignee: string;
  taskType: TaskType;
  content: string;
  itemName?: string;
  itemCount?: string;
  recipientName?: string;
  recipientPhone?: string;
  recipientAddress?: string;
  dueDate: Date;
}

// 폼 스키마 정의
export const formSchema = z
  .object({
    reporter: z.string(),
    taskName: z.string().min(1, "태스크 이름을 입력해주세요"),
    assignee: z.string().min(1, "담당자를 선택해주세요"),
    taskType: z.enum(["물품 구매", "택배 요청"]),
    content: z.string().min(1, "내용을 입력해주세요"),
    itemName: z.string().min(1, "물품명을 입력해주세요").optional(),
    itemCount: z
      .string()
      .refine((val) => (val ? /^[0-9]+$/.test(val) : true), {
        message: "숫자 형태를 입력해야 합니다.",
      })
      .optional(),
    recipientName: z.string().min(1, "수신자 이름을 입력해주세요").optional(),
    recipientPhone: z
      .string()
      .regex(
        /^\+82 010-\d{4}-\d{4}$/,
        "전화번호 형식은 +82 010-XXXX-XXXX 입니다"
      )
      .optional(),
    recipientAddress: z.string().min(1, "주소를 입력해주세요").optional(),
    dueDate: z.date({
      required_error: "마감일을 선택해주세요",
    }),
  })
  .superRefine((data, ctx) => {
    // 물품 구매 시 필수 필드 검사
    if (data.taskType === "물품 구매") {
      if (!data.itemName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "물품명을 입력해주세요",
          path: ["itemName"],
        });
      }
      if (!data.itemCount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "물품 갯수를 입력해주세요",
          path: ["itemCount"],
        });
      } else if (!/^[0-9]+$/.test(data.itemCount)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "숫자 형태를 입력해야 합니다.",
          path: ["itemCount"],
        });
      }
    }

    // 택배 요청 시 필수 필드 검사
    if (data.taskType === "택배 요청") {
      if (!data.recipientName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "수신자 이름을 입력해주세요",
          path: ["recipientName"],
        });
      }
      if (!data.recipientPhone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "수신자 전화번호를 입력해주세요",
          path: ["recipientPhone"],
        });
      } else if (!/^\+82 010-\d{4}-\d{4}$/.test(data.recipientPhone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "전화번호 형식은 +82 010-XXXX-XXXX 입니다",
          path: ["recipientPhone"],
        });
      }
      if (!data.recipientAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "주소를 입력해주세요",
          path: ["recipientAddress"],
        });
      }
    }
  });
