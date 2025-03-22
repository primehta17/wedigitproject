import React, { useState, useEffect } from "react";
import ClaimForm from "./Components/ClaimsForm";
import ClaimsTable from "./Components/ClaimTable";
import { fetchClaims } from "./Components/Api";

function App() {
  const [claims, setClaims] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [activeTab, setActiveTab] = useState("bond");

  const loadClaims = async () => {
    try {
      const data = await fetchClaims();
      setClaims(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg w-full h-screen mx-auto">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 text-lg font-semibold">
        Claims Form
      </div>

      <div className="flex flex-col lg:flex-row h-full">
        {/* Sidebar / Tabs */}
        <div className="w-full lg:w-1/5 bg-gray-50 border-r p-6 space-y-4 h-full">
          <h3 className="text-lg font-semibold text-green-600">Claim Process</h3>
          <ul className="space-y-4 text-sm">
            <li
              className={`flex items-center cursor-pointer ${
                activeTab === "bond"
                  ? "text-green-500 font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("bond")}
            >
              {activeTab === "bond" ? (
                <span className="text-green-500 mr-2">✔</span>
              ) : (
                <span className="text-gray-400 mr-2">•</span>
              )}
              Bond Information
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                activeTab === "claim"
                  ? "text-green-500 font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("claim")}
            >
              {activeTab === "claim" ? (
                <span className="text-green-500 mr-2">✔</span>
              ) : (
                <span className="text-gray-400 mr-2">•</span>
              )}
              Claim Information
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-4/5 p-6 overflow-auto">
          {activeTab === "bond" && <ClaimForm onSuccess={loadClaims} />}
          {activeTab === "claim" && <ClaimsTable claims={claims} />}
        </div>
      </div>
    </div>
  );
};

export default App;
