import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import Trips from './components/pages/Trips';
import Companies from './components/pages/Companies';
import Bookings from './components/pages/Bookings';
import Users from './components/pages/Users';
import Reports from './components/pages/Reports';
import Settings from './components/pages/Settings';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-[#081b1f] transition-colors duration-300">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;