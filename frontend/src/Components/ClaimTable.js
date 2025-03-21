import React from "react";

function ClaimsTable({ claims }) {
  return (
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
  );
}

export default ClaimsTable;

 
