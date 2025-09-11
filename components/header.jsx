"use client";

import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, FileText, GraduationCap, ChevronDown, StarsIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {

  return (
    <header className="fixed top-0 w-full border-b bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-black/90 backdrop-blur-md z-50 shadow-lg">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between" >
        <Link href="/" >
          <Image
            src={"/logo.png"}
            alt="PragatiIQ Logo"
            width={200}
            height={200}
            className="h-12 py-1 w-auto object-contain hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(129,140,248,0.6)] transition-all duration-300"
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="hidden md:inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:border-indigo-500 hover:text-indigo-400">
                <LayoutDashboard className="h-4 w-4" />
                Job Market Trends
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0 transition-all duration-300 hover:bg-gray-800 hover:text-indigo-400 hover:scale-110">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl bg-gray-900/95 backdrop-blur-md border border-gray-700">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400 transition-all duration-200">
                    <FileText className="h-4 w-4" />
                    AI Resume Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400 transition-all duration-200">
                    <PenBox className="h-4 w-4" />
                    Smart Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400 transition-all duration-200">
                    <GraduationCap className="h-4 w-4" />
                    Interview Preparation
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Start Your Career Journey</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-indigo-500 hover:ring-pink-500 transition-all duration-300 rounded-full",
                  userButtonPopoverCard: "shadow-2xl bg-gray-900/95 border border-gray-700 backdrop-blur-md",
                  userPreviewMainIdentifier: "font-semibold text-indigo-400",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}