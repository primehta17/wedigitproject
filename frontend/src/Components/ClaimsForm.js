import React, { useState } from "react";
import { submitClaim } from "./Api";
import useFormValidation from "./useFormValidation";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  claim_type: "Medical",
  claim_amount: "",
  claim_description: "",
  document: null,
};

function ClaimForm({ onSuccess }) {
  const [formData, setFormData] = useState(initialFormData);
  const { errors, validateForm } = useFormValidation(formData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const message = await submitClaim(data);
      alert(message);
      onSuccess();
      setFormData(initialFormData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
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
  );
}

export default ClaimForm;
