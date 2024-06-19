import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-300 text-indigo-900 p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            HMS
          </h1>
      <div>
        {/* {user ? (
          <div className="flex items-center">
            <p className="mr-4">Welcome, {user.name}</p>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        ) :  */}
        
          <div>
            <button 
              onClick={() => navigate('/login')} 
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Signup
            </button>
          </div>
        
        {/* } */}
      </div>
    </header>
  );
};

export default Header;
