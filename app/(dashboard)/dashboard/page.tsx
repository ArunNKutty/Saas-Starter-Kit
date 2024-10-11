import React from "react";
import { Activity, Users, Settings } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-68px)] space-y-4">
      {/* Title */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Subtitle */}
      <p className="text-gray-500">Welcome to your dashboard!</p>

      {/* Icons */}
      <div className="flex space-x-6">
        <Activity className="h-10 w-10 text-blue-500" />
        <Users className="h-10 w-10 text-green-500" />
        <Settings className="h-10 w-10 text-red-500" />
      </div>
    </div>
  );
};

export default DashboardPage;
