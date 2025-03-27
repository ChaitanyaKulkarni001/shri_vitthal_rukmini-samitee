import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditReceipt = () => {
  const { id } = useParams(); // Receipt id from URL
  const navigate = useNavigate();
  const { t } = useTranslation();
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Form data state with only allowed fields
  const [formData, setFormData] = useState({
    name: "",
    gross_weight: "",
    net_weight: "",
    receipt_type: "gold",
    image1: null,
    image2: null,
  });

  // Preview states for images (if already set on the receipt)
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  // Fetch the receipt data on component mount
  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${baseUrl}/api/users/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Token ${token}` : "",
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Pre-populate only the editable fields
          setFormData({
            name: data.name || "",
            gross_weight: data.gross_weight || "",
            net_weight: data.net_weight || "",
            receipt_type: data.receipt_type || "gold",
            image1: null,
            image2: null,
          });
          setPreviewImage1(data.image1);
          setPreviewImage2(data.image2);
        } else {
          console.error("Error fetching receipt details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchReceipt();
  }, [id, baseUrl]);

  // Handle changes for text/number/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes and update preview
  const handleFileChange = (e) => {
    const { name } = e.target; // either "image1" or "image2"
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "image1") {
          setPreviewImage1(reader.result);
        } else if (name === "image2") {
          setPreviewImage2(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit updated receipt
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("gross_weight", formData.gross_weight);
      updateData.append("net_weight", formData.net_weight);
      updateData.append("receipt_type", formData.receipt_type);
      if (formData.image1) {
        updateData.append("image1", formData.image1);
      }
      if (formData.image2) {
        updateData.append("image2", formData.image2);
      }
      const response = await fetch(`${baseUrl}/api/users/${id}/`, {
        method: "PATCH", // Use PATCH for partial update
        headers: {
          "Authorization": token ? `Token ${token}` : "",
        },
        body: updateData,
      });
      if (response.ok) {
        alert(t("receipt.updateSuccess")); // e.g. "Receipt updated successfully!"
        navigate("/receipt");
      } else {
        const errorData = await response.json();
        console.error("Update error:", errorData);
        alert(t("receipt.updateError")); // e.g. "Error updating receipt"
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t("receipt.updateError"));
    }
  };
  
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-center text-2xl font-bold text-yellow-700 mb-4">
        {t("receipt.editReceiptTitle")}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
        {/* Donor Name */}
        <div className="mb-4">
          <label className="block mb-1">{t("receipt.donorName")}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        {/* Gross Weight */}
        <div className="mb-4">
          <label className="block mb-1">{t("receipt.grossWeight")}</label>
          <input
            type="number"
            step="0.01"
            name="gross_weight"
            value={formData.gross_weight}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        {/* Net Weight */}
        <div className="mb-4">
          <label className="block mb-1">{t("receipt.netWeight")}</label>
          <input
            type="number"
            step="0.01"
            name="net_weight"
            value={formData.net_weight}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        {/* Receipt Type */}
        <div className="mb-4">
          <label className="block mb-1">{t("receipt.type")}</label>
          <select
            name="receipt_type"
            value={formData.receipt_type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="gold">{t("receipt.goldDonations")}</option>
            <option value="silver">{t("receipt.silverDonations")}</option>
          </select>
        </div>
        {/* Image 1 */}
        <div className="mb-4">
          <label className="block mb-1">{t("receipt.ornamentPhoto")}</label>
          <input
            type="file"
            name="image1"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
          {previewImage1 && (
            <img src={previewImage1} alt="Ornament Preview" className="w-32 h-32 object-cover mt-2" />
          )}
        </div>
        {/* Image 2 */}
        <div className="mb-4">
          <label className="block mb-1">{t("receipt.donorPhoto")}</label>
          <input
            type="file"
            name="image2"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
          {previewImage2 && (
            <img src={previewImage2} alt="Donor Preview" className="w-32 h-32 object-cover mt-2" />
          )}
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {t("receipt.saveChanges")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReceipt;
