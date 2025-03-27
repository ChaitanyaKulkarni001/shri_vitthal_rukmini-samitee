import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";
import "../i18n";

const DonationReport = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [donationType, setDonationType] = useState("gold"); // "gold" or "silver"
  const [donations, setDonations] = useState([]);
  const reportRef = useRef(null);
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Fetch donation data from backend on mount
  useEffect(() => {
    const fetchDonations = async () => {
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
          setDonations(data);
        } else {
          console.error("Error fetching donations:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchDonations();
  }, [baseUrl]);

  // Filter donations based on donor name and receipt type.
  const filteredDonations = donations.filter((donation) => {
    const matchesName = donation.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      donationType === "all" ||
      donation.receipt_type.toLowerCase() === donationType;
    return matchesName && matchesType;
  });

  // Generate and download PDF using html2canvas and jsPDF
  const handleDownloadPDF = async () => {
    const input = reportRef.current;
    // html2canvas options updated to handle CORS images
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("donation_report.pdf");
  };

  return (
    <div className="p-6 bg-gradient-to-b from-yellow-100 to-yellow-50 min-h-screen">
      <h2 className="text-center text-3xl font-extrabold text-yellow-700 mb-6">
        {donationType === "gold" ? t("report.title_gold") : t("report.title_silver")}
      </h2>

      {/* Search and switch for donation type */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder={t("report.searchPlaceholder")}
          className="p-3 border border-gray-300 rounded-md w-full md:w-2/3 focus:ring-2 focus:ring-yellow-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-6 py-3 font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all"
          onClick={() =>
            setDonationType(donationType === "gold" ? "silver" : "gold")
          }
        >
          {t("report.switchButton", {
            type: donationType === "gold" ? t("report.silver") : t("report.gold")
          })}
        </button>
      </div>

      {/* PDF Download Button moved above the report */}
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          {t("report.downloadPDF")}
        </button>
      </div>

      {/* Report Table with real data */}
      <div ref={reportRef} className="overflow-x-auto rounded-lg shadow-lg bg-white p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-yellow-600 text-white text-lg">
              <th className="p-3">{t("report.receiptNo")}</th>
              <th className="p-3">{t("report.donorAddress")}</th>
              <th className="p-3">{t("report.weight")}</th>
              <th className="p-3">{t("report.createdAt")}</th>
              <th className="p-3">{t("report.ornamentPhoto")}</th>
              <th className="p-3">{t("report.donorPhoto")}</th>
              <th className="p-3">{t("report.details")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation, index) => (
                <tr
                  key={index}
                  className={`border-b text-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 font-semibold text-gray-800">
                    {donation.receipt_number}
                  </td>
                  <td className="p-3 text-gray-700">
                    <span className="font-bold">{donation.name}</span>
                    <br />
                    <span className="text-sm">
                      {donation.address1} {donation.address2}
                    </span>
                    <br />
                    <span className="text-sm text-gray-500">
                      {donation.mobile}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700">
                    {donation.gross_weight} / {donation.net_weight}
                  </td>
                  <td className="p-3 text-gray-700">
                    {new Date(donation.created_at).toLocaleDateString()}{" "}
                    <br />
                    <span className="text-sm text-gray-500">
                      {new Date(donation.created_at).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="p-3">
                    <img
                      src={donation.image1}
                      alt={t("report.ornamentAlt")}
                      className="w-16 h-16 object-cover mx-auto rounded-lg shadow-md"
                      crossOrigin="anonymous"
                    />
                  </td>
                  <td className="p-3">
                    <img
                      src={donation.image2}
                      alt={t("report.donorAlt")}
                      className="w-16 h-16 object-cover mx-auto rounded-lg shadow-md"
                      crossOrigin="anonymous"
                    />
                  </td>
                  <td className="p-3 text-gray-700">
                    {donation.goods || donation.gotra || ""}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  {t("report.noDonations")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationReport;

