import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const Form = () => {
  const [donationType, setDonationType] = useState("gold");
  const [donorName, setDonorName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [netWeight, setNetWeight] = useState("");
  const [ornamentPhoto, setOrnamentPhoto] = useState(null);
  const [donorPhoto, setDonorPhoto] = useState(null);
  const webcamRefOrnament = useRef(null);
  const webcamRefDonor = useRef(null);

  // Capture Ornament Photo
  const captureOrnamentPhoto = () => {
    const imageSrc = webcamRefOrnament.current.getScreenshot();
    setOrnamentPhoto(imageSrc);
  };

  // Capture Donor Photo
  const captureDonorPhoto = () => {
    const imageSrc = webcamRefDonor.current.getScreenshot();
    setDonorPhoto(imageSrc);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const donationData = {
      donationType,
      donorName,
      mobile,
      address,
      grossWeight,
      netWeight,
      ornamentPhoto,
      donorPhoto,
    };
    console.log("Donation Entry Submitted:", donationData);
    alert("Donation entry saved successfully!");
  };

  // Reset Form
  const resetForm = () => {
    setDonationType("gold");
    setDonorName("");
    setMobile("");
    setAddress("");
    setGrossWeight("");
    setNetWeight("");
    setOrnamentPhoto(null);
    setDonorPhoto(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">🛕 Trust Donation Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Donation Type */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Donation Type:</span>
          <select
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50"
          >
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </label>

        {/* Donor Name */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Donor Name:</span>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50"
            required
          />
        </label>

        {/* Mobile Number */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Mobile Number:</span>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50"
            required
          />
        </label>

        {/* Address */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Address:</span>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50"
            required
          ></textarea>
        </label>

        {/* Gross Weight */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Gross Weight (gms):</span>
          <input
            type="number"
            value={grossWeight}
            onChange={(e) => setGrossWeight(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50"
            required
          />
        </label>

        {/* Net Weight */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Net Weight (gms):</span>
          <input
            type="number"
            value={netWeight}
            onChange={(e) => setNetWeight(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50"
            required
          />
        </label>

        {/* Photo Capture Section (Side by Side) */}
        <div className="flex justify-between gap-6">
          {/* Ornament Photo */}
          <div className="flex flex-col items-center">
            <span className="text-gray-700 font-semibold mb-1">Ornament Photo:</span>
            <Webcam ref={webcamRefOrnament} screenshotFormat="image/png" className="w-64 h-48 border rounded-lg" />
            <button
              type="button"
              onClick={captureOrnamentPhoto}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Capture
            </button>
            {ornamentPhoto && <img src={ornamentPhoto} alt="Ornament" className="w-24 h-24 mt-2 border rounded-lg" />}
          </div>

          {/* Donor Photo */}
          <div className="flex flex-col items-center">
            <span className="text-gray-700 font-semibold mb-1">Donor Photo:</span>
            <Webcam ref={webcamRefDonor} screenshotFormat="image/png" className="w-64 h-48 border rounded-lg" />
            <button
              type="button"
              onClick={captureDonorPhoto}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Capture
            </button>
            {donorPhoto && <img src={donorPhoto} alt="Donor" className="w-24 h-24 mt-2 border rounded-lg" />}
          </div>
        </div>

        {/* Submit & Reset Buttons */}
        <div className="flex justify-between mt-4 pb-20">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Save Donation
          </button>
          <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
