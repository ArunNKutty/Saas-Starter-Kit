"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Users,
  Settings,
  Shield,
  Activity,
  Menu,
  Home,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  User,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-none xl:px-9">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <span className="font-medium">Settings</span>
        </div>
        <Button
          className="-mr-3"
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white lg:bg-gray-50 border-r border-gray-200 lg:block ${
            isSidebarOpen ? "block" : "hidden"
          } lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="h-full overflow-y-auto p-4">
            <Link href="/dashboard" passHref>
              <Button
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                className={`my-1 w-full justify-start ${
                  pathname === "/dashboard" ? "bg-gray-100" : ""
                }`}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            {/* Settings Menu */}
            <Button
              variant="ghost"
              className="my-1 w-full justify-start"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
              {isSettingsOpen ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </Button>

            {isSettingsOpen && (
              <div className="pl-4 space-y-1">
                <Link href="/dashboard/general" passHref>
                  <Button
                    variant={
                      pathname === "/dashboard/general" ? "secondary" : "ghost"
                    }
                    className={`w-full justify-start ${
                      pathname === "/dashboard/general" ? "bg-gray-100" : ""
                    }`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Account Information
                  </Button>
                </Link>
                <Link href="/dashboard/team" passHref>
                  <Button
                    variant={
                      pathname === "/dashboard/team" ? "secondary" : "ghost"
                    }
                    className={`w-full justify-start ${
                      pathname === "/dashboard/team" ? "bg-gray-100" : ""
                    }`}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Team
                  </Button>
                </Link>
                <Link href="/dashboard/activity" passHref>
                  <Button
                    variant={
                      pathname === "/dashboard/activity" ? "secondary" : "ghost"
                    }
                    className={`w-full justify-start ${
                      pathname === "/dashboard/activity" ? "bg-gray-100" : ""
                    }`}
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Activity
                  </Button>
                </Link>
                <Link href="/dashboard/security" passHref>
                  <Button
                    variant={
                      pathname === "/dashboard/security" ? "secondary" : "ghost"
                    }
                    className={`w-full justify-start ${
                      pathname === "/dashboard/security" ? "bg-gray-100" : ""
                    }`}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-0 lg:p-4">{children}</main>

        {/* Chat Button */}
        <div className="fixed bottom-4 right-4 md:bottom-16 md:right-20">
          <Button
            variant="ghost"
            className="flex items-center space-x-2"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageCircle className="h-6 w-6" />
            <span>Chat</span>
          </Button>
        </div>

        {/* Chat Window */}
        {isChatOpen && (
          <div className="fixed bottom-16 right-4 w-80 bg-white border shadow-lg rounded-lg">
            <div className="p-4 border-b">
              <span className="font-medium">Chat</span>
              <Button
                variant="ghost"
                className="float-right"
                onClick={() => setIsChatOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="p-4 h-[32rem] overflow-y-auto">
              {/* Chat messages will appear here */}
              <p className="text-sm text-gray-500">
                This is a chat placeholder.
              </p>
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
