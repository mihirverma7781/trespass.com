"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  firstname: z
    .string({
      message: "Invalid string",
    })
    .min(2, { message: "first name should contain atleast 2 chars" })
    .max(20, { message: "first name should contain atmost 20 chars" }),
  lastname: z
    .string({
      message: "Invalid string",
    })
    .min(2, { message: "last name should contain atleast 2 chars" })
    .max(20, { message: "last name should contain atmost 20 chars" }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string({
      message: "Invalid password",
    })
    .min(8, { message: "Password should be between 8-20 chars" })
    .max(20, { message: "Password should be between 8-20 chars" }),
});

const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="border border-gray-700 flex flex-col gap-5">
      <h1 className="font-semibold text-slate-900 text-2xl">
        Let's Get Started
      </h1>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => {
              return (
                <div>
                  <Label className="text-[14px] font-medium text-black">
                    Firstname
                  </Label>
                  <Input
                    className="mt-1 h-[52px] rounded-2xl border border-gray-500 text-sm"
                    placeholder="Enter your firstname"
                    {...field}
                  />
                </div>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => {
              return (
                <div>
                  <Label className="text-[14px] font-medium text-black">
                    Lastname
                  </Label>
                  <Input
                    className="mt-1 h-[52px] rounded-2xl border border-gray-500 text-sm"
                    placeholder="Enter your lastname"
                    {...field}
                  />
                </div>
              );
            }}
          ></FormField>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
