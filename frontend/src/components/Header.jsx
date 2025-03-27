import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../i18n"; // Import the i18n configuration

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("auth"); // Check login status

  const handleLogout = () => {
    sessionStorage.removeItem("auth"); // Clear authentication
    navigate("/"); // Redirect to login
  };

  const toggleLanguage = () => {
    // Toggle between English (en) and Marathi (mr)
    i18n.changeLanguage(i18n.language === "en" ? "mr" : "en");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">{t("header.title")}</h1>
      <div className="flex items-center space-x-4">
        <nav className="flex space-x-4">
          <Link 
            to="/form" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
          >
            {t("header.form")}
          </Link>
          <Link 
            to="/receipt" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
          >
            {t("header.receipt")}
          </Link>
          <Link 
            to="/report" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
          >
            {t("header.report")}
          </Link>
        </nav>
        {/* Language Toggle Button */}
        <button 
          onClick={toggleLanguage} 
          className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
        >
          {i18n.language === "en" ? "मराठी" : "English"}
        </button>
        <button 
          onClick={handleLogout} 
          className="bg-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-300"
        >
          {t("header.logout")}
        </button>
      </div>
    </header>
  );
};

export default Header;
