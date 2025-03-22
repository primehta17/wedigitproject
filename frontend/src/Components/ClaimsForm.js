import React, { useState } from 'react';
import { submitClaim } from './Api';
import useFormValidation from './useFormValidation';

const ClaimForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    claim_type: 'Medical',
    claim_amount: '',
    claim_description: '',
    document: null,
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const { errors, validateForm } = useFormValidation(formData);

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
      const message = await submitClaim(data);
      setSubmissionStatus({ success: true, message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        claim_type: 'Medical',
        claim_amount: '',
        claim_description: '',
        document: null,
      });
    } catch (err) {
      setSubmissionStatus({
        success: false,
        message: err.message || 'Error submitting claim.',
      });
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-4">
     <form
  onSubmit={handleSubmit}
  className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-3xl mb-6"
  encType="multipart/form-data"
>
  <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
    Submit a Claim
  </h2>

  {/* Name and Email in Same Row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    {[
      { label: "Name", type: "text", name: "name" },
      { label: "Email", type: "email", name: "email" },
    ].map((input) => (
      <div key={input.name}>
        <label className="block text-sm font-medium text-gray-700">
          {input.label}
        </label>
        <input
          type={input.type}
          name={input.name}
          value={formData[input.name]}
          onChange={handleChange}
          className={`mt-1 w-full px-4 py-2 border ${
            errors[input.name] ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
        />
        {errors[input.name] && (
          <p className="text-red-500 text-sm">{errors[input.name]}</p>
        )}
      </div>
    ))}
  </div>

  {/* Phone and Claim Amount in Same Row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    {[
      { label: "Phone", type: "tel", name: "phone" },
      { label: "Claim Amount", type: "number", name: "claim_amount" },
    ].map((input) => (
      <div key={input.name}>
        <label className="block text-sm font-medium text-gray-700">
          {input.label}
        </label>
        <input
          type={input.type}
          name={input.name}
          value={formData[input.name]}
          onChange={handleChange}
          className={`mt-1 w-full px-4 py-2 border ${
            errors[input.name] ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
        />
        {errors[input.name] && (
          <p className="text-red-500 text-sm">{errors[input.name]}</p>
        )}
      </div>
    ))}
  </div>

  {/* Claim Type Dropdown */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Claim Type</label>
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

  {/* Claim Description */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Claim Description
    </label>
    <textarea
      name="claim_description"
      value={formData.claim_description}
      onChange={handleChange}
      rows="3"
      className={`mt-1 w-full px-4 py-2 border ${
        errors.claim_description ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
    />
    {errors.claim_description && (
      <p className="text-red-500 text-sm">{errors.claim_description}</p>
    )}
  </div>

  {/* File Upload */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Upload Document
    </label>
    <input
      type="file"
      name="document"
      onChange={handleChange}
      className={`mt-1 w-full px-4 py-2 border ${
        errors.document ? "border-red-500" : "border-gray-300"
      } rounded-lg`}
    />
    {errors.document && (
      <p className="text-red-500 text-sm">{errors.document}</p>
    )}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
  >
    Submit Claim
  </button>

  {/* Submission Status */}
  {submissionStatus && (
    <div
      className={`mt-4 p-4 rounded-lg ${
        submissionStatus.success
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {submissionStatus.message}
    </div>
  )}
</form>


    </div>
  );
};

export default ClaimForm;
