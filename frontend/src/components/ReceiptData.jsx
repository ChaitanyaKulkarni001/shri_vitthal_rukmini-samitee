import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../i18n"
const ReceiptData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [receiptFilter, setReceiptFilter] = useState("gold"); // 'gold', 'silver', or 'all'
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

  // Filter receipts based on donor name and receipt type
  const filteredReceipts = receipts.filter((receipt) => {
    const matchesName = receipt.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      receiptFilter === "all" ||
      receipt.receipt_type.toLowerCase() === receiptFilter;
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
      updatedReceipts[0].name = t("receipt.modifiedName");
      setReceipts(updatedReceipts);
      alert(t("receipt.modifyAlert"));
    }
  };

  // Function to clear receipts (example: exit)
  const handleExit = () => {
    setReceipts([]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-center text-2xl font-bold text-yellow-700 mb-4">
        {t("receipt.title")}
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder={t("receipt.searchPlaceholder")}
          className="p-2 border border-gray-300 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={receiptFilter}
          onChange={(e) => setReceiptFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4"
        >
          <option value="all">{t("receipt.allDonations")}</option>
          <option value="gold">{t("receipt.goldDonations")}</option>
          <option value="silver">{t("receipt.silverDonations")}</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-yellow-500 text-white">
              <th className="p-2">{t("receipt.scroll")}</th>
              <th className="p-2">{t("receipt.head")}</th>
              <th className="p-2">{t("receipt.acNo")}</th>
              <th className="p-2">{t("receipt.receiptNo")}</th>
              <th className="p-2">{t("receipt.donorName")}</th>
              <th className="p-2">{t("receipt.grossWeight")}</th>
              <th className="p-2">{t("receipt.netWeight")}</th>
              <th className="p-2">{t("receipt.type")}</th>
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
                  {t("receipt.noReceipts")}
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
          {t("receipt.add")}
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          {t("receipt.print")}
        </button>
        <button
          onClick={handleModify}
          className="px-4 py-2 bg-yellow-500 text-white rounded shadow-md hover:bg-yellow-600"
        >
          {t("receipt.modify")}
        </button>
        <button
          onClick={handleExit}
          className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
        >
          {t("receipt.exit")}
        </button>
      </div>
    </div>
  );
};

export default ReceiptData;
