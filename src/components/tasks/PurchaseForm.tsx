// components/task/PurchaseForm.tsx
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

interface PurchaseFormProps {
  control: Control<FormValues>;
}

export function PurchaseForm({ control }: PurchaseFormProps) {
  return (
    <>
      <FormField
        control={control}
        name="itemName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>물품명</FormLabel>
            <FormControl>
              <Input placeholder="물품명을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="itemCount"
        render={({ field, fieldState }) => {
          return (
            <FormItem>
              <FormLabel>물품 갯수</FormLabel>
              <FormControl>
                <Input
                  placeholder="숫자만 입력하세요"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm font-medium text-destructive">
                  숫자 형태를 입력해야 합니다.
                </p>
              )}
            </FormItem>
          );
        }}
      />
    </>
  );
}
