// components/task/TaskModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

// 사용자 정의 컴포넌트 및 유틸리티 가져오기
import { CommonFields } from "./CommonFields";
import { PurchaseForm } from "./PurchaseForm";
import { DeliveryForm } from "./DeliveryForm";
import { DatePickerField } from "./DatePickerField";
import { getAssignableUsers, getDefaultValues } from "@/utils/taskUtils";
import {
  FormValues,
  TaskType,
  TaskModalProps,
  formSchema,
} from "@/types/task-form";

export function TaskModal({
  open,
  onOpenChange,
  currentUser,
  userList,
}: TaskModalProps) {
  const [taskType, setTaskType] = useState<TaskType>("물품 구매");

  // 할당 가능한 사용자 목록 가져오기
  const assignableUsers = getAssignableUsers(currentUser, userList);

  // 기본 폼 설정
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(currentUser),
    mode: "onSubmit",
  });

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues(currentUser));
      setTaskType("물품 구매");
      form.setValue("taskType", "물품 구매");
    }
  }, [open, currentUser, form]);

  // Task 타입이 변경되면 해당 필드 초기화
  useEffect(() => {
    // 기존 값 가져오기
    const currentValues = form.getValues();

    if (taskType === "물품 구매") {
      form.setValue("itemName", currentValues.itemName || "");
      form.setValue("itemCount", currentValues.itemCount || "");
      // 택배 관련 값 제거
      form.unregister("recipientName");
      form.unregister("recipientPhone");
      form.unregister("recipientAddress");
    } else {
      form.setValue("recipientName", currentValues.recipientName || "");
      form.setValue(
        "recipientPhone",
        currentValues.recipientPhone || "+82 010-"
      );
      form.setValue("recipientAddress", currentValues.recipientAddress || "");
      // 물품 구매 관련 값 제거
      form.unregister("itemName");
      form.unregister("itemCount");
    }

    // 에러 초기화
    form.clearErrors();
  }, [taskType, form]);

  // 폼 제출 핸들러
  const onSubmit = (data: FormValues) => {
    console.log("제출된 데이터:", data);
    onOpenChange(false);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    form.reset(getDefaultValues(currentUser));
    setTaskType("물품 구매");
    onOpenChange(false);
  };

  // 현재 사용자의 역할이 Viewer인 경우 모달 접근 불가
  if (currentUser.userRole === "Viewer") {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Task 생성</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* 공통 필드 */}
            <CommonFields
              control={form.control}
              currentUser={currentUser}
              assignableUsers={assignableUsers}
              taskType={taskType}
              setTaskType={setTaskType}
            />

            {/* 태스크 타입에 따른 필드 렌더링 */}
            {taskType === "물품 구매" ? (
              <PurchaseForm control={form.control} />
            ) : (
              <DeliveryForm control={form.control} />
            )}

            {/* 마감일 필드 */}
            <DatePickerField control={form.control} />

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
