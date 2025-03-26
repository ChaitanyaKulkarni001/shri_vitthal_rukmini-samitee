import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import ReceiptData from "./components/ReceiptData";
import Login from "./components/Login";
import DonationReport from "./components/DonationReport";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute"; // Import Protected Route

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes (User must be logged in) */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/form" element={<Form />} />
          <Route path="/add-receipt" element={<Form />} />
          <Route path="/report" element={<DonationReport />} />
          <Route path="/receipt" element={<ReceiptData />} />
        {/* </Route> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
