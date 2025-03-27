import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Form from "./components/Form";
import ReceiptData from "./components/ReceiptData";
import Login from "./components/Login";
import DonationReport from "./components/DonationReport";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute"; // if needed
import EditReceipt from "./components/EditReceipt";
const AppLayout = () => {
  const location = useLocation();
  // Hide header and footer on the login page
  const hideHeaderFooter = location.pathname === "/";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        {/* Protected Routes */}
        {/* Uncomment and use ProtectedRoute if you need to protect these routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/form" element={<Form />} />
          <Route path="/add-receipt" element={<Form />} />
          <Route path="/report" element={<DonationReport />} />
          <Route path="/receipt" element={<ReceiptData />} />
          <Route path="/edit-receipt/:id" element={<EditReceipt />} />
        </Route>
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
