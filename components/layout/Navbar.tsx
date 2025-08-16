
import React, { useState } from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon } from '../icons';

const Navbar: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#fbfffd] pr-64 shadow-sm border-b border-gray-200 z-10">
      <div className="flex items-center justify-between h-full px-8">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="البحث عن رحلات أو شركات..."
            className="w-96 h-10 px-4 pr-10 rounded-lg bg-gray-100 text-[#081b1f] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5bd4b0]"
          />
        </div>
        
        {/* Icons & Profile */}
        <div className="flex items-center space-x-6">
            <button className="relative text-[#081b1f] hover:text-[#5bd4b0] transition-colors">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
                    <img src="https://picsum.photos/seed/profile/40/40" alt="Profile" className="w-10 h-10 rounded-full"/>
                    <span className="hidden md:inline text-[#081b1f]">علي حسن</span>
                    <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>
                {profileOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                        <a href="#" className="block px-4 py-2 text-sm text-[#081b1f] hover:bg-gray-100">إعدادات الحساب</a>
                        <a href="#" className="block px-4 py-2 text-sm text-[#081b1f] hover:bg-gray-100">تسجيل الخروج</a>
                    </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
