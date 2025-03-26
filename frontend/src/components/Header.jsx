import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("auth"); // Check login status

  const handleLogout = () => {
    sessionStorage.removeItem("auth"); // Clear authentication
    navigate("/"); // Redirect to login
  };

  return (
    <header className="bg-yellow-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🛕 Trust Management</h1>

      {/* {isAuthenticated && ( */}
        <>
          <nav className="space-x-6">
            <Link to="/form" className="hover:text-gray-200">📄 Form</Link>
            <Link to="/receipt" className="hover:text-gray-200">🧾 Receipt</Link>
            <Link to="/report" className="hover:text-gray-200">📊 Report</Link>
          </nav>

          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </>
      {/* )} */}
    </header>
  );
};

export default Header;
