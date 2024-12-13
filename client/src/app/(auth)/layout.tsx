import React from "react";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div>
      <header className="">
        <p className="">TressPass</p>
      </header>
      <main className="px-4 my-10">{children}</main>
      <footer>footer</footer>
    </div>
  );
};

export default AuthLayout;
