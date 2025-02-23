import {
  Bell,
  CalendarClock,
  ChartSplineIcon,
  HomeIcon,
  Library,
  LucideLogOut,
  LucideUsersRound,
  MessageCircleQuestionIcon,
  MessagesSquare,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="flex flex-col font-medium h-screen min-w-[250px] max-w-[350px] p-4  shadow-slate-300 shadow-lg border-r-1 border-slate-300 bg-white">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex-1 flex flex-col gap-y-4">
        <ul className="flex flex-col gap-4 text-slate-500">
          <li>
            <Link href="/dashboard/ " className="flex items-center gap-x-2">
              <HomeIcon /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/friends "
              className="flex items-center gap-x-2"
            >
              {" "}
              <ChartSplineIcon />
              Analytics
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-y-3 text-slate-500">
          <span className=" font-medium text-lg mb-2 text-slate-300">
            Tools
          </span>
          <li>
            <Link
              href="/dashboard/friends "
              className="flex items-center gap-x-2"
            >
              {" "}
              <MessagesSquare />
              Messages
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/friends "
              className="flex items-center gap-x-2"
            >
              {" "}
              <LucideUsersRound />
              Friends
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/friends "
              className="flex items-center gap-x-2"
            >
              {" "}
              <CalendarClock />
              Calendar
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/friends "
              className="flex items-center gap-x-2"
            >
              {" "}
              <Library />
              Study resources
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-y-3 text-slate-500 mb-4">
          <li>
            <Link
              href="/dashboard/friends "
              className="flex items-center gap-x-2"
            >
              {" "}
              <MessageCircleQuestionIcon />
              Support
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/friends "
              className="flex items-center gap-x-2"
            >
              {" "}
              <SettingsIcon />
              Settings
            </Link>
          </li>
        </ul>
        <button className="h-[80px] w-full  flex items-center gap-x-8 text-red-500">
          <span className=" flex justify-start font-medium">Logout</span>{" "}
          <LucideLogOut />
        </button>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="border-b-2 border-slate-100 pb-6  mb-9 pt-8 pr-8 min-h-[80px] w-full overflow-hidden flex items-center">
      <div className="flex-1">
        <Image src="/logo.png" width="140" height="60" alt={""} />
      </div>
      <div className="relative">
        <div className="notifications bg-green-500 w-8 h-8 flex items-center justify-center rounded-full text-white text-xs absolute -top-5 p-0 -right-4">
          2
        </div>
        <Bell />
      </div>
    </div>
  );
};

export default Nav;
