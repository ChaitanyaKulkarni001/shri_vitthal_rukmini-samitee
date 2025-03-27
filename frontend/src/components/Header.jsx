import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("auth"); // Check login status

  const handleLogout = () => {
    sessionStorage.removeItem("auth"); // Clear authentication
    navigate("/"); // Redirect to login
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🛕 Shri Vitthal Rukmini Mandir Samiti</h1>
      <div className="flex items-center space-x-4">
        <nav className="flex space-x-4">
          <Link 
            to="/form" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
          >
            Form
          </Link>
          <Link 
            to="/receipt" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
          >
            Receipt
          </Link>
          <Link 
            to="/report" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
          >
            Report
          </Link>
        </nav>
        <button 
          onClick={handleLogout} 
          className="bg-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
