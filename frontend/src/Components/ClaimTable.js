import React from "react";

function ClaimsTable({ claims }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-5xl overflow-x-auto border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800  border-b" >
        All Submitted Claims
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
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
                  className="px-5 py-3 text-left font-medium tracking-wider border-b"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {claims.map((claim, index) => (
              <tr
                key={claim.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-5 py-3 border-b">{claim.id}</td>
                <td className="px-5 py-3 border-b">{claim.name}</td>
                <td className="px-5 py-3 border-b">{claim.email}</td>
                <td className="px-5 py-3 border-b">{claim.phone}</td>
                <td className="px-5 py-3 border-b">{claim.claim_type}</td>
                <td className="px-5 py-3 border-b text-green-600 font-medium">
                  ${claim.claim_amount}
                </td>
                <td className="px-5 py-3 border-b">{claim.claim_description}</td>
                <td className="px-5 py-3 border-b">
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
                    <span className="text-gray-400">No Document</span>
                  )}
                </td>
                <td className="px-5 py-3 border-b text-gray-500">
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
