import React, { ReactNode, useContext } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Header from "../custom/Header";
import { headers } from "next/headers";
import buildClient from "@/api/build-client";

const Links = () => {
  return (
    <div>
      <Button variant={"link"} asChild>
        <Link href={"/"}>Home</Link>
      </Button>
      <Button variant={"link"} asChild>
        <Link href={"/"}>Concerts</Link>
      </Button>
      <Button variant={"link"} asChild>
        <Link href={"/"}>Singers</Link>
      </Button>
    </div>
  );
};

const AuthLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const headersList = await headers();
  const response = await buildClient({ headers: headersList }).get(
    "/api/users/currentuser"
  );
  const userData = response?.data?.data?.currentUser;

  console.log("AuthLayout ===> ", userData);
  return (
    <>
      <Header userData={userData} links={<Links />} />
      {children}
    </>
  );
};

export default AuthLayout;
