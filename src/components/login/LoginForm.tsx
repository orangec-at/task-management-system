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
import { useRef } from "react";
import { useAuth } from "../providers/AuthProvider";

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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

  const handleSetRole = (role: string) => () => {
    const roleMembers = users.filter((user) => user.userRole === role);
    const user = roleMembers[Math.ceil(Math.random() * roleMembers.length)];
    if (!user) {
      form.setError("email", {
        type: "manual",
        message: "User not found",
      });
      return;
    }

    form.setValue("email", user.userEmail);
    form.setValue("password", "jinwoo");
    form.handleSubmit(onSubmit)();
  };

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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

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
              <Button type="submit" className="hover:cursor-pointer">
                Submit
              </Button>
            </div>
            <div className="flex justify-between ">
              <Button
                type="button"
                onClick={handleSetRole("Admin")}
                className="hover:cursor-pointer"
              >
                Admin
              </Button>
              <Button
                type="button"
                onClick={handleSetRole("PrimeUser")}
                className="hover:cursor-pointer"
              >
                Prime User
              </Button>
              <Button
                type="button"
                onClick={handleSetRole("RegularUser")}
                className="hover:cursor-pointer"
              >
                Regular User
              </Button>
              <Button
                type="button"
                onClick={handleSetRole("Viewer")}
                className="hover:cursor-pointer"
              >
                Viewer
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
