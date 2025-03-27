import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useTranslation } from "react-i18next";

// Helper function to convert a base64 data URL to a File object
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) return null;
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const Form = () => {
  const { t } = useTranslation();

  // Form field states
  const [accountHead, setAccountHead] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [donorName, setDonorName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [taluka, setTaluka] = useState("");
  const [district, setDistrict] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [stateField, setStateField] = useState("");
  const [mobile, setMobile] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [netWeight, setNetWeight] = useState("");
  const [goods, setGoods] = useState("");
  const [gotra, setGotra] = useState("");
  const [receiptType, setReceiptType] = useState("gold");

  // States for image captures (base64 strings)
  const [ornamentPhoto, setOrnamentPhoto] = useState(null); // image1
  const [donorPhoto, setDonorPhoto] = useState(null); // image2

  // Webcam references
  const webcamRefOrnament = useRef(null);
  const webcamRefDonor = useRef(null);

  // State for camera switching
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  // Enumerate video input devices when component mounts
  useEffect(() => {
    const getDevices = async () => {
      try {
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = deviceInfos.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    getDevices();
  }, []);

  // Video constraints for the webcam using the selected device
  const videoConstraints = {
    deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
  };

  // Handler to change the selected device from the dropdown
  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
  };

  // Capture functions for images
  const captureOrnamentPhoto = () => {
    const imageSrc = webcamRefOrnament.current.getScreenshot();
    setOrnamentPhoto(imageSrc);
  };

  const captureDonorPhoto = () => {
    const imageSrc = webcamRefDonor.current.getScreenshot();
    setDonorPhoto(imageSrc);
  };

  // Handle form submission with FormData (sends files and text fields)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("account_head", accountHead);
    formData.append("account_number", accountNumber);
    formData.append("receipt_number", receiptNumber);
    formData.append("name", donorName);
    formData.append("address1", address1);
    formData.append("address2", address2);
    formData.append("taluka", taluka);
    formData.append("district", district);
    formData.append("pin_code", pinCode);
    formData.append("state", stateField);
    formData.append("mobile", mobile);
    formData.append("gross_weight", grossWeight);
    formData.append("net_weight", netWeight);
    formData.append("goods", goods);
    formData.append("gotra", gotra);
    formData.append("receipt_type", receiptType);

    // Convert base64 images to File objects and append if available
    if (ornamentPhoto) {
      const ornamentFile = dataURLtoFile(
        ornamentPhoto,
        `${donorName}_ornament.jpg`
      );
      if (ornamentFile) {
        formData.append("image1", ornamentFile);
      }
    }
    if (donorPhoto) {
      const donorFile = dataURLtoFile(
        donorPhoto,
        `${donorName}_donor.jpg`
      );
      if (donorFile) {
        formData.append("image2", donorFile);
      }
    }

    // Use Vite environment variable if available
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseUrl}/api/users/`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        // Browser sets the Content-Type header automatically for FormData
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(t("form.successMessage"));
        resetForm();
      } else {
        console.error("Backend errors:", data);
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(t("form.submissionError"));
    }
  };

  // Reset all form fields and captured images
  const resetForm = () => {
    setAccountHead("");
    setAccountNumber("");
    setReceiptNumber("");
    setDonorName("");
    setAddress1("");
    setAddress2("");
    setTaluka("");
    setDistrict("");
    setPinCode("");
    setStateField("");
    setMobile("");
    setGrossWeight("");
    setNetWeight("");
    setGoods("");
    setGotra("");
    setReceiptType("gold");
    setOrnamentPhoto(null);
    setDonorPhoto(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        {t("form.title")}
      </h2>

      {/* Camera selection dropdown if multiple devices are available */}
      {devices.length > 1 && (
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            {t("form.selectCamera")}
          </label>
          <select
            value={selectedDeviceId}
            onChange={handleDeviceChange}
            className="p-2 border border-gray-300 rounded bg-gray-50"
          >
            {devices.map((device, index) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `${t("form.camera")} ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.accountHead")}</span>
            <input
              type="text"
              value={accountHead}
              onChange={(e) => setAccountHead(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.accountNumber")}</span>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.receiptNumber")}</span>
            <input
              type="text"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
        </div>

        {/* Personal & Address Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.donorName")}</span>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.mobileNumber")}</span>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.address1")}</span>
            <textarea
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            ></textarea>
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.address2")}</span>
            <textarea
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
            ></textarea>
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.taluka")}</span>
            <input
              type="text"
              value={taluka}
              onChange={(e) => setTaluka(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.district")}</span>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.pinCode")}</span>
            <input
              type="text"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.state")}</span>
            <input
              type="text"
              value={stateField}
              onChange={(e) => setStateField(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
        </div>

        {/* Donation Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.grossWeight")}</span>
            <input
              type="number"
              value={grossWeight}
              onChange={(e) => setGrossWeight(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.netWeight")}</span>
            <input
              type="number"
              value={netWeight}
              onChange={(e) => setNetWeight(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.goods")}</span>
            <input
              type="text"
              value={goods}
              onChange={(e) => setGoods(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.gotra")}</span>
            <input
              type="text"
              value={gotra}
              onChange={(e) => setGotra(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">{t("form.receiptType")}</span>
            <select
              value={receiptType}
              onChange={(e) => setReceiptType(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50"
            >
              <option value="gold">{t("form.gold")}</option>
              <option value="silver">{t("form.silver")}</option>
            </select>
          </label>
        </div>

        {/* Photo Capture Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Ornament Photo */}
          <div className="flex flex-col items-center">
            <span className="text-gray-700 font-semibold mb-1">
              {t("form.ornamentPhoto")}
            </span>
            <Webcam
              ref={webcamRefOrnament}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              className="w-64 h-48 border rounded-lg"
            />
            <button
              type="button"
              onClick={captureOrnamentPhoto}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {t("form.capture")}
            </button>
            {ornamentPhoto && (
              <img
                src={ornamentPhoto}
                alt={t("form.ornamentAlt")}
                className="w-24 h-24 mt-2 border rounded-lg"
              />
            )}
          </div>

          {/* Donor Photo */}
          <div className="flex flex-col items-center">
            <span className="text-gray-700 font-semibold mb-1">
              {t("form.donorPhoto")}
            </span>
            <Webcam
              ref={webcamRefDonor}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              className="w-64 h-48 border rounded-lg"
            />
            <button
              type="button"
              onClick={captureDonorPhoto}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {t("form.capture")}
            </button>
            {donorPhoto && (
              <img
                src={donorPhoto}
                alt={t("form.donorAlt")}
                className="w-24 h-24 mt-2 border rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Submit & Reset Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {t("form.saveDonation")}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            {t("form.reset")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
