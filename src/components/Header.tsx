import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from '../lib/userStorage';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <header className="bg-white py-4 px-6 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen size={24} className="text-[#4D61FC]" />
          <h1 className="text-lg font-semibold text-gray-900">EasyA Events</h1>
        </Link>
        
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button 
              onClick={() => signOut()}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/signin')}
            className="bg-[#4D61FC] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#3D4FE7] transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;