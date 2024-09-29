"use client"; // Required for Next.js Client Component
import { useState } from "react";
import { FaChartPie, FaChevronLeft, FaChevronRight, FaCreditCard, FaHome } from "react-icons/fa"; // Add icons
import Budget from "../Budget/page";
import CreditCardRecommendation from "../CreditCardRecommendation/pages";
import MortgageCalculator from "../MortgageCalculator/page";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("budget");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar toggle

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Function to toggle sidebar

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#1A237E] p-4 shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-between`}
      >
        <div>
          {/* Sidebar Header */}
          <h2
            className={`text-xl font-bold mb-8 text-center text-white transition-all duration-300 ${
              !isSidebarOpen && "opacity-0"
            }`}
          >
            Hello User!
          </h2>

          {/* Navigation */}
          <nav className="space-y-6">
            <button
              onClick={() => setActiveTab("budget")}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-all duration-300 ease-in-out ${
                activeTab === "budget"
                  ? "bg-[#FFB74D] text-[#1A237E] shadow-lg"
                  : "text-white hover:bg-[#FFB74D] hover:text-[#1A237E]"
              }`}
            >
              <FaChartPie className="text-xl" />
              {isSidebarOpen && <span className="ml-3">Budget Planner</span>}
            </button>
            <button
              onClick={() => setActiveTab("CreditCardRecommendation")}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-all duration-300 ease-in-out ${
                activeTab === "CreditCardRecommendation"
                  ? "bg-[#FFB74D] text-[#1A237E] shadow-lg"
                  : "text-white hover:bg-[#FFB74D] hover:text-[#1A237E]"
              }`}
            >
              <FaCreditCard className="text-xl" />
              {isSidebarOpen && <span className="ml-3">Credit Card</span>}
            </button>
            <button
              onClick={() => setActiveTab("MortgageCalculator")}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-all duration-300 ease-in-out ${
                activeTab === "MortgageCalculator"
                  ? "bg-[#FFB74D] text-[#1A237E] shadow-lg"
                  : "text-white hover:bg-[#FFB74D] hover:text-[#1A237E]"
              }`}
            >
              <FaHome className="text-xl" />
              {isSidebarOpen && <span className="ml-3">Mortgage Calculator</span>}
            </button>
          </nav>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="bg-[#0D47A1] text-white p-2 rounded-full mt-6 self-center transition-all duration-300 ease-in-out"
        >
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        <div className="bg-blue-950 rounded-xl drop-shadow-lg	 p-10">

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "budget" && <Budget />}
            {activeTab === "MortgageCalculator" && <MortgageCalculator />}
            {activeTab === "CreditCardRecommendation" && <CreditCardRecommendation />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
