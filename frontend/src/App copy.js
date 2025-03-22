import React, { useState, useEffect } from "react";
import ClaimForm from "./Components/ClaimsForm";
import ClaimsTable from "./Components/ClaimTable";
import { fetchClaims } from "./Components/Api";

function App() {
  const [claims, setClaims] = useState([]);
  const [showTable, setShowTable] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-4">
      <ClaimForm onSuccess={loadClaims} />
      <button
        onClick={() => setShowTable(!showTable)}
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded-lg hover:bg-green-600"
      >
        {showTable ? "Hide Claims" : "View All Claims"}
      </button>
      {showTable && <ClaimsTable claims={claims} />}
    </div>
  );
}

export default App;
