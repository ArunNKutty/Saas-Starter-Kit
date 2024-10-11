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
  MessageCircle,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat visibility

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/team", icon: Users, label: "Team" },
    { href: "/dashboard/general", icon: Settings, label: "General" },
    { href: "/dashboard/activity", icon: Activity, label: "Activity" },
    { href: "/dashboard/security", icon: Shield, label: "Security" },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full">
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
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`my-1 w-full justify-start ${
                    pathname === item.href ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-0 lg:p-4">{children}</main>

        {/* Chat Button */}
        <div className="fixed bottom-4 right-4">
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
