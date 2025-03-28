"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface TaskNameDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function TaskNameDropdown({ value, onChange }: TaskNameDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 옵션
  const options = [
    { id: "taskName", label: "Task Name" },
    { id: "reporter", label: "Reporter" },
    { id: "description", label: "Description" },
    { id: "assignee", label: "담당자 (Assignee)" },
  ];

  // 현재 선택된 옵션 레이블 가져오기
  const selectedLabel =
    options.find((opt) => opt.id === value)?.label || "Task Name";

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 드롭다운 헤더 */}
      <div
        className="flex items-center justify-between w-[150px] px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">{selectedLabel}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1">
          {options.map((option) => (
            <div
              key={option.id}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                value === option.id ? "bg-gray-50" : ""
              }`}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
