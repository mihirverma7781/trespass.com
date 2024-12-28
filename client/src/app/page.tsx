"use client";

import { headers } from "next/headers";
import buildClient from "@/api/build-client";
import { useAuth } from "@/contexts/auth-context";

const LandingPage = async () => {
  // const headersList = await headers();
  // const response = await buildClient({ headers: headersList }).get(
  //   "/api/users/currentuser"
  // );
  // const userData = response?.data?.data?.currentUser;
  // console.log("Langing page", userData);
  const { userData } = useAuth();
  console.log("user data", userData);
  return userData ? (
    <h1>Your are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

export default LandingPage;
