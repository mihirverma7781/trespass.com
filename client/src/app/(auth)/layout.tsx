import Header from "@/components/custom/Header";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ children }) => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="px-4 my-10 w-full flex justify-center min-h-[calc(100vh-200px)] xl:max-w-[1200px] xl:px-0 xl:mx-auto">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
