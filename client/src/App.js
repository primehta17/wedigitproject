import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    claim_type: "Medical",
    claim_amount: "",
    claim_description: "",
    document: null,
  });

  const [errors, setErrors] = useState({});
  const [claims, setClaims] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (
      !formData.claim_amount ||
      formData.claim_amount < 100 ||
      formData.claim_amount > 1000000
    )
      newErrors.claim_amount = "Claim amount must be between 100 and 1,000,000.";
    if (!formData.claim_description.trim())
      newErrors.claim_description = "Claim description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/claims", data);
      alert(res.data.message);
      fetchClaims(); // Refresh table after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        claim_type: "Medical",
        claim_amount: "",
        claim_description: "",
        document: null,
      });
    } catch (err) {
      alert(err.response?.data?.error || "Error submitting claim.");
    }
  };

  const fetchClaims = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/claims");
      setClaims(res.data);
    } catch (err) {
      console.error("Error fetching claims:", err);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg mb-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Submit a Claim
        </h2>

        {[
          { label: "Name", type: "text", name: "name" },
          { label: "Email", type: "email", name: "email" },
          { label: "Phone", type: "tel", name: "phone" },
          { label: "Claim Amount", type: "number", name: "claim_amount" },
        ].map((input) => (
          <div key={input.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {input.label}
            </label>
            <input
              type={input.type}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors[input.name] && (
              <p className="text-red-500 text-sm">{errors[input.name]}</p>
            )}
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Claim Type
          </label>
          <select
            name="claim_type"
            value={formData.claim_type}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {["Medical", "Property", "Travel", "Other"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Claim Description
          </label>
          <textarea
            name="claim_description"
            value={formData.claim_description}
            onChange={handleChange}
            rows="3"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.claim_description && (
            <p className="text-red-500 text-sm">{errors.claim_description}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Document (optional)
          </label>
          <input
            type="file"
            name="document"
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Claim
        </button>
      </form>

      <button
        onClick={() => setShowTable(!showTable)}
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded-lg hover:bg-green-600"
      >
        {showTable ? "Hide Claims" : "View All Claims"}
      </button>

      {showTable && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-5xl overflow-x-auto">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-700">
            All Submitted Claims
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "ID",
                    "Name",
                    "Email",
                    "Phone",
                    "Type",
                    "Amount",
                    "Description",
                    "Document",
                    "Date",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-4 py-2 border text-left text-sm font-medium text-gray-600"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border">{claim.id}</td>
                    <td className="px-4 py-2 border">{claim.name}</td>
                    <td className="px-4 py-2 border">{claim.email}</td>
                    <td className="px-4 py-2 border">{claim.phone}</td>
                    <td className="px-4 py-2 border">{claim.claim_type}</td>
                    <td className="px-4 py-2 border">${claim.claim_amount}</td>
                    <td className="px-4 py-2 border">{claim.claim_description}</td>
                    <td className="px-4 py-2 border">
                      {claim.document_url ? (
                        <a
                          href={claim.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View
                        </a>
                      ) : (
                        "No Document"
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(claim.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
