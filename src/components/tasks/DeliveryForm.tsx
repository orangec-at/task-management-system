// components/task/DeliveryForm.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/task-form";

interface DeliveryFormProps {
  control: Control<FormValues>;
}

export function DeliveryForm({ control }: DeliveryFormProps) {
  return (
    <>
      <FormField
        control={control}
        name="recipientName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>수신자 이름</FormLabel>
            <FormControl>
              <Input placeholder="김철수" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="recipientPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>수신자 전화번호</FormLabel>
            <FormControl>
              <Input placeholder="+82 010-1234-5678" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="recipientAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>수신자 주소</FormLabel>
            <FormControl>
              <Input placeholder="서울시 강남구 테헤란로 123 5층" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
