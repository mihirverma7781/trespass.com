"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { toast } from "@/hooks/use-toast";
import useRequest from "@/hooks/use-request";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormDescription, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstname: z
    .string({
      message: "Invalid string",
    })
    .min(2, { message: "first name should contain atleast 2 characters" })
    .max(20, { message: "first name should contain atmost 20 characters" }),
  lastname: z
    .string({
      message: "Invalid string",
    })
    .min(2, { message: "last name should contain atleast 2 characters" })
    .max(20, { message: "last name should contain atmost 20 characters" }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string({
      message: "Invalid password",
    })
    .min(8, { message: "Password should be between 8-20 characters" })
    .max(20, { message: "Password should be between 8-20 characters" }),
});

const Signup = () => {
  const router = useRouter();
  const { doRequest, errors, isLoading } = useRequest({
    url: "/api/users/signup",
    method: "post",
    onSuccess: (response: AxiosResponse) => {
      toast({
        title: "Signup Success",
        description: response.data.message,
      });
      router.push("/");
    },

    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data?.errors?.map(
          (err: any, idx: any) => {
            return (
              <p key={idx} className="mt-1">
                {err.message}
              </p>
            );
          }
        ),
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await doRequest(values);
      console.log("response", response);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-white w-full min-h-[calc(100vh-100px)] flex items-center justify-center lg:justify-between rounded-2xl">
      <div className="w-full lg:w-1/2">
        <div className=" flex flex-col gap-5 w-full md:max-w-[400px] mx-auto p-5">
          <h1 className="font-semibold text-slate-900 text-2xl lg:text-3xl">
            Signup
          </h1>
          <p className="mt-[-12px] text-sm text-gray-500">
            Create a new account for you
          </p>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(submitForm)}
            >
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => {
                  return (
                    <div>
                      <Label className="text-[14px] font-normal text-black">
                        Firstname
                      </Label>
                      <Input
                        className="mt-1 h-[52px] rounded-2xl border border-gray-500 text-sm"
                        placeholder="Enter your firstname"
                        {...field}
                      />
                      {form.formState.errors?.firstname && (
                        <p className="text-xs text-red-600 mt-2">
                          {form.formState.errors.firstname.message}
                        </p>
                      )}
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
                      <Label className="text-[14px] font-normal text-black">
                        Lastname
                      </Label>
                      <Input
                        className="mt-1 h-[52px] rounded-2xl border border-gray-500 text-sm"
                        placeholder="Enter your lastname"
                        {...field}
                      />
                      {form.formState.errors?.lastname && (
                        <p className="text-xs text-red-600 mt-2">
                          {form.formState.errors.lastname.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              ></FormField>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <div>
                      <Label className="text-[14px] font-normal text-black">
                        Email
                      </Label>
                      <Input
                        className="mt-1 h-[52px] rounded-2xl border border-gray-500 text-sm"
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                      {form.formState.errors?.email && (
                        <p className="text-xs text-red-600 mt-2">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              ></FormField>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <div>
                      <Label className="text-[14px] font-normal text-black">
                        Password
                      </Label>
                      <Input
                        className="mt-1 h-[52px] rounded-2xl border border-gray-500 text-sm"
                        placeholder="Create your password"
                        type="password"
                        {...field}
                      />

                      <FormDescription className="font-normal text-black text-[12px] mt-2">
                        Must be at least 8 characters.
                      </FormDescription>
                      {form.formState.errors?.password && (
                        <p className="text-xs text-red-600 mt-2">
                          {form.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              ></FormField>

              <Button
                type="submit"
                className="rounded-2xl text-white text-sm bg-blue-700 h-[50px] mt-4 hover:bg-blue-600"
              >
                Create an account
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="font-semibold text-blue-700 transition-all hover:text-blue-600"
              href={"/signin"}
            >
              Signin
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2">
        <div className="w-full object-cover">
          <Image
            src={"/welcome.svg"}
            width={1000}
            height={1000}
            style={{
              width: "100%",
              height: "800px",
              objectFit: "cover",
              borderRadius: "0 16px 16px 0",
            }}
            alt="welcome to tresspass"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
