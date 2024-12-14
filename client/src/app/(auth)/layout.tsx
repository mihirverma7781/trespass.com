import React from "react";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="bg-gray-50">
      <header className="">
        <p className="">TressPass</p>
      </header>
      <main className="px-4 my-10 w-full flex justify-center xl:max-w-[1200px] xl:px-0 xl:mx-auto">
        {children}
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default AuthLayout;
