import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const ReceiptData = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [receipts, setReceipts] = useState([
    { scroll: 15, heac: 116, acNo: 17, receiptNo: "2025030000392", donor: "SHRI RUKMINI GABHARA DANPETI", grossWeight: "9.840", netWeight: "0.300" },
    { scroll: 16, heac: 116, acNo: 17, receiptNo: "2025030000393", donor: "SHRI VITHAL GABHARA DANPETI", grossWeight: "9.000", netWeight: "0.700" },
    { scroll: 17, heac: 116, acNo: 17, receiptNo: "2025030000394", donor: "SHRI NAMDEV PAYARI", grossWeight: "3.430", netWeight: "0.020" },
    { scroll: 25, heac: 116, acNo: 17, receiptNo: "2025030000395", donor: "RAVIKANTH BEHERA", grossWeight: "11.520", netWeight: "0.011" },
  ]);

  const filteredReceipts = receipts.filter((receipt) =>
    receipt.donor.toLowerCase().includes(search.toLowerCase())
  );

  // Function to add a new receipt (receives data from form page)
  const addReceipt = (newReceipt) => {
    setReceipts([...receipts, newReceipt]);
  };

  // Function to print receipts
  const handlePrint = () => {
    window.print();
  };

  // Function to modify a receipt (for now, we update the first one as an example)
  const handleModify = () => {
    if (receipts.length > 0) {
      const updatedReceipts = [...receipts];
      updatedReceipts[0].donor = "Modified Donor Name"; // Example update
      setReceipts(updatedReceipts);
      alert("Modified the first receipt.");
    }
  };

  // Function to exit (clear all receipts)
  const handleExit = () => {
    setReceipts([]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-center text-2xl font-bold text-yellow-700 mb-4">Gold Receipt</h2>
      <input
        type="text"
        placeholder="Search Receipt"
        className="p-2 border border-gray-300 rounded mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.length > 0 ? (
              filteredReceipts.map((receipt, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="p-2">{receipt.scroll}</td>
                  <td className="p-2">{receipt.heac}</td>
                  <td className="p-2">{receipt.acNo}</td>
                  <td className="p-2">{receipt.receiptNo}</td>
                  <td className="p-2">{receipt.donor}</td>
                  <td className="p-2">{receipt.grossWeight}</td>
                  <td className="p-2">{receipt.netWeight}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No receipts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <button onClick={() => navigate("/add-receipt")} className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600">
          Add
        </button>
        <button onClick={handlePrint} className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600">
          Print
        </button>
        <button onClick={handleModify} className="px-4 py-2 bg-yellow-500 text-white rounded shadow-md hover:bg-yellow-600">
          Modify
        </button>
        <button onClick={handleExit} className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600">
          Exit
        </button>
      </div>
    </div>
  );
};

export default ReceiptData;
