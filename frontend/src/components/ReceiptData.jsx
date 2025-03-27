import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../i18n";

const ReceiptData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [receiptFilter, setReceiptFilter] = useState("gold"); // 'gold', 'silver', or 'all'
  const [receipts, setReceipts] = useState([]);
  const reportRef = useRef(null);
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

  // Function to download the report as PDF
  const handleDownloadReport = async () => {
    // Clone the report element
    const clonedReport = reportRef.current.cloneNode(true);
  
    // Hide the last two columns (updated_by and actions) in both header and body
    clonedReport.querySelectorAll("thead tr").forEach((row) => {
      const cells = Array.from(row.children);
      if (cells.length >= 2) {
        cells[cells.length - 1].style.display = "none"; // Hide actions column
        cells[cells.length - 2].style.display = "none"; // Hide updated_by column
      }
    });
    
    clonedReport.querySelectorAll("tbody tr").forEach((row) => {
      const cells = Array.from(row.children);
      if (cells.length >= 2) {
        cells[cells.length - 1].style.display = "none"; // Hide actions column
        cells[cells.length - 2].style.display = "none"; // Hide updated_by column
      }
    });
  
    // Append cloned element to a temporary container
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "-10000px"; // Hide from view
    tempDiv.appendChild(clonedReport);
    document.body.appendChild(tempDiv);
  
    // Use html2canvas to capture the cloned element with the updated styling
    const canvas = await html2canvas(clonedReport, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("receipt_report.pdf");
  
    // Cleanup: remove the temporary container
    document.body.removeChild(tempDiv);
  };
  
  // Navigate to the edit page for a given receipt
  const handleEdit = (receiptId) => {
    navigate(`/edit-receipt/${receiptId}`);
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

      <div className="mt-4 flex flex-wrap gap-2 justify-center mb-4">
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
          onClick={handleDownloadReport}
          className="px-4 py-2 bg-indigo-500 text-white rounded shadow-md hover:bg-indigo-600"
        >
          {t("report.downloadPDF")}
        </button>
        <button
          onClick={handleExit}
          className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
        >
          {t("receipt.exit")}
        </button>
      </div>
      
      {/* Report Table with the ref for PDF capture */}
      <div ref={reportRef} className="overflow-x-auto">
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
              {/* Hide these two columns on mobile */}
              <th className="p-2 hidden md:table-cell">{t("receipt.updated_by")}</th>
              <th className="p-2 hidden md:table-cell">{t("receipt.actions")}</th>
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
                  {/* Hide these on mobile */}
                  <td className="p-2 hidden md:table-cell">
                    {receipt.updated_by ? receipt.updated_by : t("receipt.notAvailable")}
                  </td>
                  <td className="p-2 hidden md:table-cell">
                    <button
                      onClick={() => handleEdit(receipt.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <span className="material-symbols-outlined">
                        edit
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="p-4 text-center text-gray-500">
                  {t("receipt.noReceipts")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default ReceiptData;
