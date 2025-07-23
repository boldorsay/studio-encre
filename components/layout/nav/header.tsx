"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [menuState, setMenuState] = React.useState(false)
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2">
                <Icon
                  parentColor="default"
                  data={{
                    name: "Tina",
                    color: "orange",
                    style: "float",
                  }}
                />{" "}
                <span>
                  Tina Starter
                </span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <div className="flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                    About
                  </Link>
                </div>
              </div>
            </div>

            <div
              data-state={menuState && 'active'}
              className="in-data-[state=active]:opacity-100 in-data-[state=active]:scale-100 in-data-[state=active]:translate-y-0 absolute left-0 top-full z-10 w-full origin-top-left scale-95 opacity-0 translate-y-[-1rem] transition-all duration-200 lg:hidden">
              <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4">
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                      About
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
