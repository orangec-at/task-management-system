"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { useRef, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Eye, EyeOff } from "lucide-react";

import _users from "@/data/user_list.json";
import { User } from "@/types/user";

const users = _users as User[];

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default function LoginForm() {
  const { login } = useAuth();
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { watch } = form;
  const email = watch("email");
  const password = watch("password");
  const isFormValid = email && password;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email } = values;

    const user = users.find((user) => user.userEmail === email);
    if (!user) {
      form.setError("email", {
        type: "manual",
        message: "User not found",
      });
      return;
    }

    login(user);
  }

  function handleCancel() {
    form.reset({
      email: "",
      password: "",
    });
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>
          계정에 로그인하려면 이메일과 비밀번호를 입력하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이메일 주소를 입력해 주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력해 주세요."
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <Eye size={20} className="text-gray-500" />
                      ) : (
                        <EyeOff size={20} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={handleCancel}
                className="hover:cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="hover:cursor-pointer"
                disabled={!isFormValid}
              >
                Log-In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
