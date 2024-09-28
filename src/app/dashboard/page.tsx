"use client"; // Required for Next.js Client Component
import { useState } from "react";
import Budget from "../Budget/page";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-blue-950 text-white p-8">
      {/* Navigation Tabs */}
      <div className="tabs flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("budget")}
          className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ease-in-out ${
            activeTab === "budget"
              ? "bg-yellow-500 text-blue-950"
              : "bg-white text-blue-950 hover:bg-yellow-500 hover:text-white"
          }`}
        >
          Budget
        </button>
        <button
          onClick={() => setActiveTab("savings")}
          className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ease-in-out ${
            activeTab === "savings"
              ? "bg-yellow-500 text-blue-950"
              : "bg-white text-blue-950 hover:bg-yellow-500 hover:text-white"
          }`}
        >
          Savings
        </button>
      </div>

      {/* Conditionally Render Tab Content */}
      <div className="tab-content">
        {activeTab === "budget" && <Budget />}
      </div>
    </div>
  );
};

export default Dashboard;
