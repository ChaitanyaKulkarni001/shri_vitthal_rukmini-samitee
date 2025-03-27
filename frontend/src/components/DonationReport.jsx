import React, { useState } from "react";

const DonationReport = () => {
  const [search, setSearch] = useState("");
  const [donationType, setDonationType] = useState("gold");

  const donations = [
    {
      receiptNo: "GD-2025030000373",
      donor: "SHRI VITHAL GABHARA DANPETI",
      address: "Open Peti 27/02/2025, Check Peti 03/03/2025",
      phone: "9822191932",
      grossWeight: "0.58",
      netWeight: "0.50",
      date: "04/03/2025",
      time: "12:30 PM",
      ornamentPhoto: "ornament1.jpg",
      donorPhoto: "donor1.jpg",
      details: "SARAF TESTING RECEIPT NO 4057",
      type: "gold",
    },
    {
      receiptNo: "SD-2025030000380",
      donor: "SHRI RAM MANDIR DONATION",
      address: "Silver Peti 01/03/2025",
      phone: "9822112233",
      grossWeight: "1.20",
      netWeight: "1.10",
      date: "05/03/2025",
      time: "10:15 AM",
      ornamentPhoto: "ornament2.jpg",
      donorPhoto: "donor2.jpg",
      details: "SARAF TESTING RECEIPT NO 4061",
      type: "silver",
    },
  ];

  const filteredDonations = donations.filter(
    (donation) =>
      donation.type === donationType &&
      donation.donor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-b from-yellow-100 to-yellow-50 min-h-screen">
      <h2 className="text-center text-3xl font-extrabold text-yellow-700 mb-6">
        {donationType === "gold" ? "Gold" : "Silver"} Donation Report
      </h2>

      {/* Search & Switch */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Donor"
          className="p-3 border border-gray-300 rounded-md w-full md:w-2/3 focus:ring-2 focus:ring-yellow-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-6 py-3 font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all"
          onClick={() => setDonationType(donationType === "gold" ? "silver" : "gold")}
        >
          Switch to {donationType === "gold" ? "Silver" : "Gold"} Donations
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-yellow-600 text-white text-lg">
              <th className="p-3">Receipt No</th>
              <th className="p-3">Donor Name & Address</th>
              <th className="p-3">Weight (Gross/Net)</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Ornament Photo</th>
              <th className="p-3">Donor Photo</th>
              <th className="p-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation, index) => (
              <tr
                key={index}
                className={`border-b text-center ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 font-semibold text-gray-800">{donation.receiptNo}</td>
                <td className="p-3 text-gray-700">
                  <span className="font-bold">{donation.donor}</span>
                  <br />
                  <span className="text-sm">{donation.address}</span>
                  <br />
                  <span className="text-sm text-gray-500">{donation.phone}</span>
                </td>
                <td className="p-3 text-gray-700">
                  <span className="font-medium">{donation.grossWeight} / {donation.netWeight}</span>
                </td>
                <td className="p-3 text-gray-700">
                  {donation.date} <br />
                  <span className="text-sm text-gray-500">{donation.time}</span>
                </td>
                <td className="p-3">
                  <img
                    src={`/assets/${donation.ornamentPhoto}`}
                    alt="Ornament"
                    className="w-16 h-16 object-cover mx-auto rounded-lg shadow-md"
                  />
                </td>
                <td className="p-3">
                  <img
                    src={`/assets/${donation.donorPhoto}`}
                    alt="Donor"
                    className="w-16 h-16 object-cover mx-auto rounded-full shadow-md"
                  />
                </td>
                <td className="p-3 text-gray-700">{donation.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationReport;
