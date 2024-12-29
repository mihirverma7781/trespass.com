"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { Mail, ShoppingCart, AlignJustify, X, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  user: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (user) {
    return (
      <header className="w-full px-4 h-20 flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Left Navigation Links */}
        <div className="hidden lg:flex left-links gap-2 text-slate-900">
          <Button variant={"link"} asChild>
            <Link
              className="decoration-dashed decoration-blue-500 hover:text-blue-700"
              href={"/"}
            >
              Home
            </Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link
              className="decoration-dashed decoration-blue-500 hover:text-blue-700"
              href={"/"}
            >
              Concerts
            </Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link
              className="decoration-dashed decoration-blue-500 hover:text-blue-700"
              href={"/"}
            >
              Singers
            </Link>
          </Button>
        </div>

        {/* Logo */}
        <div className="flex object-fill h-10 w-[208px]">
          <Image alt="logo" src={Logo} height={40} width={180} className="" />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-2xl border-0"
          >
            <ShoppingCart height={42} width={42} className="h-10 w-10" />
          </Button>

          <Button className="h-10 rounded-2xl bg-blue-700 text-white hover:bg-blue-600">
            <UserRound /> My Account
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="h-12 w-12 rounded-2xl border-0 flex p-3 items-center justify-center hover:bg-slate-50 transition-all"
          >
            {menuOpen ? <X size={28} /> : <AlignJustify size={28} />}
          </button>
        </div>

        {/* Collapsible Mobile Menu with Glassmorphism */}
        <div
          className={`lg:hidden absolute top-0 left-0 w-full bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-20 transition-all duration-300 ease-in-out transform ${
            menuOpen ? "translate-y-20" : "-translate-y-full"
          }`}
        >
          <div className="h-[calc(100vh-80px)] flex flex-col items-center gap-4 py-20 px-4">
            <Button variant={"link"} asChild>
              <Link
                className="decoration-dashed decoration-blue-500 hover:text-blue-700"
                href={"/"}
              >
                Home
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link
                className="decoration-dashed decoration-blue-500 hover:text-blue-700"
                href={"/"}
              >
                Concerts
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link
                className="decoration-dashed decoration-blue-500 hover:text-blue-700"
                href={"/"}
              >
                Singers
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-2xl border-0"
            >
              <ShoppingCart height={42} width={42} className="h-10 w-10" />
            </Button>
            <Button className="h-10 w-full rounded-2xl bg-blue-700 text-white hover:bg-blue-600">
              <UserRound /> My Account
            </Button>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className="w-full px-4 h-20 flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Left Navigation Links */}
        <div className="hidden lg:flex left-links gap-2 text-slate-900">
          <Button variant={"link"} asChild>
            <Link
              className="decoration-dashed decoration-blue-500 hover:text-blue-700"
              href={"/"}
            >
              Home
            </Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link
              className="decoration-dashed decoration-blue-500 hover:text-blue-700"
              href={"/"}
            >
              Concerts
            </Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link
              className="decoration-dashed decoration-blue-500 hover:text-blue-700"
              href={"/"}
            >
              Singers
            </Link>
          </Button>
        </div>

        {/* Logo */}
        <div className="flex object-fill h-10 w-[208px]">
          <Image alt="logo" src={Logo} height={40} width={180} className="" />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-2xl border-0"
          >
            <ShoppingCart height={42} width={42} className="h-10 w-10" />
          </Button>

          <Button
            className="h-10 rounded-2xl bg-blue-700 text-white hover:bg-blue-600"
            onClick={() => router.push("/signin")}
          >
            <Mail /> Login with Email
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="h-12 w-12 rounded-2xl border-0 flex p-3 items-center justify-center hover:bg-slate-50 transition-all"
          >
            {menuOpen ? <X size={28} /> : <AlignJustify size={28} />}
          </button>
        </div>

        {/* Collapsible Mobile Menu with Glassmorphism */}
        <div
          className={`lg:hidden absolute top-0 left-0 w-full bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-20 transition-all duration-300 ease-in-out transform ${
            menuOpen ? "translate-y-20" : "-translate-y-full"
          }`}
        >
          <div className="h-[calc(100vh-80px)] flex flex-col items-center gap-4 py-20 px-4">
            <Button variant={"link"} asChild>
              <Link
                className="decoration-dashed decoration-blue-500 hover:text-blue-700"
                href={"/"}
              >
                Home
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link
                className="decoration-dashed decoration-blue-500 hover:text-blue-700"
                href={"/"}
              >
                Concerts
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link
                className="decoration-dashed decoration-blue-500 hover:text-blue-700"
                href={"/"}
              >
                Singers
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-2xl border-0"
            >
              <ShoppingCart height={42} width={42} className="h-10 w-10" />
            </Button>
            <Button
              className="h-10 w-full rounded-2xl bg-blue-700 text-white hover:bg-blue-600"
              onClick={() => router.push("/signin")}
            >
              <Mail /> Login with Email
            </Button>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
