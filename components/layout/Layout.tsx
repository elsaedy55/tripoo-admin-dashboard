import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#fbfffd]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden pr-64">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fbfffd] pt-16">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;