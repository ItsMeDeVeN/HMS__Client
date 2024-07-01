import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../components/profile.jpg"
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user_id = localStorage.getItem("User_Id");
  const name = localStorage.getItem("Name");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Role");
    localStorage.removeItem("User_Id");
    localStorage.removeItem("Name");
    toast.success("Logged Out Succesfully!!!",
      {onClose : () => {navigate('/');}}
    )
    // setTimeout(() => {navigate('/');},2000)
    
  };


  return (
    <header className="bg-gray-300 text-indigo-900 p-4 flex justify-between items-center">
    <h1 className="text-3xl font-bold cursor-pointer">
      HMS
    </h1>
    {user_id ? (
      <div className="relative">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={toggleDropdown}>
          <span>Welcome, {name}</span>
          <img
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover hover:shadow-md transform hover:scale-105 transition"
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    ): (
        <div>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Signup
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
