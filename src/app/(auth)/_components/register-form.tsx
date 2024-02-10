"use client";

import { useTransition, useState } from "react";
import * as z from "zod";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FormErrorStatus } from "./form-error-status";
import { FormSuccessStatus } from "./form-success-status";
import { register } from "@/actions/register";
import { Loader } from "lucide-react";
import { RegisterSchema } from "@/schemas/register-schema";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitForm = (data: z.infer<typeof RegisterSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");

    startTransition(() =>
      register(data).then((data) => {
        setSuccessMessage(data.success);
        setErrorMessage(data.error);
        form.reset();
      })
    );
  };

  return (
    <Card className="w-full h-full md:w-[500px] shadow-lg my-6">
      <CardHeader className="flex items-center justify-center w-full">
        <CardTitle>Register</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(submitForm)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="input your name"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john-doe@gmail.com"
                        type="email"
                        disabled={isPending}
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
                        placeholder="***********"
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
              variant="main"
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <div className="w-full h-full flex items-center justify-center space-x-2">
                  <Loader className="animate-spin w-4 h-4" />
                  <span>Processing</span>
                </div>
              ) : (
                <span>Register</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="w-full flex items-center justify-center">
        <span className="text-xs text-muted-foreground">
          Already registered?
          <Link
            href="/login"
            className="text-btn/80 hover:text-btn ml-2 font-bold"
          >
            Login
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};
