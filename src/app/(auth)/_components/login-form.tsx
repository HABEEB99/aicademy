"use client";

import { useTransition, useState } from "react";

import Link from "next/link";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Loader } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { login } from "@/actions/login";
import { FormErrorStatus } from "./form-error-status";
import { FormSuccessStatus } from "./form-success-status";
import { LoginSchema } from "@/schemas/login-schema";
import { useToast } from "@/components/ui/use-toast";

export const LoginForm = () => {
  const toast = useToast();

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submitForm = (data: z.infer<typeof LoginSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");

    startTransition(() =>
      login(data).then((data) => {
        setSuccessMessage(data?.success);
        setErrorMessage(data?.error);
        form.reset();
      })
    );
  };

  return (
    <Card className="w-full h-full md:w-[500px] my-6">
      <CardHeader className="flex items-center justify-center w-full">
        <CardTitle className="text-sm">
          Please login through the channels below
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(submitForm)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="john-doe@gmail.com"
                        type="email"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="*************"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormErrorStatus message={errorMessage} />
            <FormSuccessStatus message={successMessage} />

            <Button
              disabled={isPending}
              type="submit"
              variant="main"
              className="w-full text-white"
            >
              {isPending ? (
                <div className="w-full h-full flex items-center justify-center space-x-2">
                  <Loader className="animate-spin w-4 h-4" />
                  <span>Processing</span>
                </div>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="flex items-center justify-center px-4 my-4">
        <div className="border-[1px] border-gray-300 w-full mx-2" /> OR{" "}
        <div className="border-[1px] border-gray-300 w-full mx-2" />
      </div>

      <CardFooter className="gap-3">
        <Button
          variant="outline"
          className="w-full hover:bg-red-500 hover:text-white font-extrabold text-red-700"
        >
          G
        </Button>

        <Button
          variant="outline"
          className="w-full hover:bg-blue-500 hover:text-white group"
        >
          <Facebook className="w-4 h-4 text-blue-600 group-hover:text-white" />
        </Button>
      </CardFooter>

      <CardFooter className="w-full flex items-center justify-center">
        <span className="text-xs text-muted-foreground">
          Don&apos;t have an account yet?
          <Link
            href="/register"
            className="text-btn/80 hover:text-btn ml-2 font-bold"
          >
            Register
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};
