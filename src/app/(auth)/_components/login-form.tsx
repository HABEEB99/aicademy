"use client";

import { useTransition, useState } from "react";

import Link from "next/link";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Facebook, Key, Loader, Mail } from "lucide-react";

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
import Image from "next/image";

export const LoginForm = () => {
  const toast = useToast();

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

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
                  <FormItem className="group space-y-0">
                    <FormLabel className="group-hover:text-btn text-xs font-bold text-muted-foreground">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-center border rounded-md px-1 space-x-1">
                        <Mail className="font-bold w-4 h-4 text-btn" />
                        <Input
                          {...field}
                          placeholder="john-doe@gmail.com"
                          type="text"
                          className="p-0 border-none hover:border-none  bg-none outline-none focus-visible:outline-none
                          focus-visible:border-none focus-visible:ring-offset-0 border-0 focus:border-0 focus-visible:ring-0"
                          disabled={isPending}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="group space-y-0">
                    <FormLabel className="group-hover:text-btn text-xs font-bold text-muted-foreground">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-center border rounded-md px-1 space-x-1">
                        <Key className="font-bold w-4 h-4 text-btn" />
                        <Input
                          {...field}
                          placeholder="jdkdk39393i@#"
                          type={isVisible ? "text" : "password"}
                          className="p-0 border-none hover:border-none  bg-none outline-none focus-visible:outline-none
                          focus-visible:border-none focus-visible:ring-offset-0 border-0 focus:border-0 focus-visible:ring-0"
                          disabled={isPending}
                        />

                        {isVisible ? (
                          <EyeOff
                            onClick={toggleVisibility}
                            className="font-bold w-4 h-4 text-btn cursor-pointer"
                          />
                        ) : (
                          <Eye
                            onClick={toggleVisibility}
                            className="font-bold w-4 h-4 text-btn cursor-pointer"
                          />
                        )}
                      </div>
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
        <div className="border-[1px] border-gray-300 w-full mx-2" /> OR
        <div className="border-[1px] border-gray-300 w-full mx-2" />
      </div>

      <CardFooter className="gap-3">
        <Button
          variant="outline"
          className="w-full hover:bg-red-400 gap-2 text-muted-foreground"
        >
          <Image src="/google.png" alt="Github logo" width={15} height={15} />
          Google
        </Button>

        <Button
          variant="outline"
          className="w-full hover:bg-gray-400 group gap-2 text-muted-foreground"
        >
          <Image src="/github.png" alt="Github logo" width={15} height={15} />
          Github
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
