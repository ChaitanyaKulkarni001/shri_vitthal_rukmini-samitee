import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReceiptData = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [receiptFilter, setReceiptFilter] = useState("gold"); // 'gold' or 'silver' or 'all'
  const [receipts, setReceipts] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Fetch receipt data from the backend on component mount
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${baseUrl}/api/users/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Token ${token}` : "",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setReceipts(data);
        } else {
          console.error("Error fetching receipts:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchReceipts();
  }, [baseUrl]);

  // Filter receipts based on donor name and receipt type (if not "all")
  const filteredReceipts = receipts.filter((receipt) => {
    const matchesName = receipt.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      receiptFilter === "all" || receipt.receipt_type.toLowerCase() === receiptFilter;
    return matchesName && matchesType;
  });

  // Function to print receipts
  const handlePrint = () => {
    window.print();
  };

  // Function to modify a receipt (example: modifying the first record)
  const handleModify = () => {
    if (receipts.length > 0) {
      const updatedReceipts = [...receipts];
      updatedReceipts[0].name = "Modified Donor Name"; // Example update
      setReceipts(updatedReceipts);
      alert("Modified the first receipt.");
    }
  };

  // Function to clear receipts (example: exit)
  const handleExit = () => {
    setReceipts([]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-center text-2xl font-bold text-yellow-700 mb-4">Donation Receipts</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by donor name"
          className="p-2 border border-gray-300 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={receiptFilter}
          onChange={(e) => setReceiptFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4"
        >
          <option value="all">All Donations</option>
          <option value="gold">Gold Donations</option>
          <option value="silver">Silver Donations</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-yellow-500 text-white">
              <th className="p-2">Scroll</th>
              <th className="p-2">Head</th>
              <th className="p-2">AcNo</th>
              <th className="p-2">Receipt No</th>
              <th className="p-2">Donor Name</th>
              <th className="p-2">Gross Weight</th>
              <th className="p-2">Net Weight</th>
              <th className="p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.length > 0 ? (
              filteredReceipts.map((receipt, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{receipt.account_head}</td>
                  <td className="p-2">{receipt.account_number}</td>
                  <td className="p-2">{receipt.receipt_number}</td>
                  <td className="p-2">{receipt.name}</td>
                  <td className="p-2">{receipt.gross_weight}</td>
                  <td className="p-2">{receipt.net_weight}</td>
                  <td className="p-2">{receipt.receipt_type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No receipts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => navigate("/add-receipt")}
          className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600"
        >
          Add
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          Print
        </button>
        <button
          onClick={handleModify}
          className="px-4 py-2 bg-yellow-500 text-white rounded shadow-md hover:bg-yellow-600"
        >
          Modify
        </button>
        <button
          onClick={handleExit}
          className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default ReceiptData;
