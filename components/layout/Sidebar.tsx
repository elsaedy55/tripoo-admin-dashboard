
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, BusIcon, BuildingIcon, UsersIcon, UserCheckIcon, BarChartIcon, SettingsIcon, LogoutIcon } from '../icons';

const navLinks = [
  { name: 'لوحة التحكم', href: '/', icon: DashboardIcon },
  { name: 'الرحلات', href: '/trips', icon: BusIcon },
  { name: 'الشركات', href: '/companies', icon: BuildingIcon },
  { name: 'المستخدمين', href: '/bookings', icon: UsersIcon }, // Repurposed Bookings page for End Users
  { name: 'الموظفين', href: '/users', icon: UserCheckIcon }, // Repurposed Users page for Staff
  { name: 'التقارير', href: '/reports', icon: BarChartIcon },
  { name: 'الإعدادات', href: '/settings', icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 right-0 h-full w-64 bg-white text-[#081b1f] flex flex-col p-4 border-l border-gray-100 shadow-lg z-20">
      <div className="text-center py-4 mb-6">
        <h1 className="text-3xl font-bold text-[#5bd4b0] tracking-wider">Tripoo</h1>
      </div>
      <nav className="flex-grow">
        <ul>
          {navLinks.map((link) => (
            <li key={link.name} className="mb-2">
              <NavLink
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-200 text-lg font-medium ${
                    isActive
                      ? 'bg-[#5bd4b0] text-white'
                      : 'text-gray-500 hover:bg-[#5bd4b0] hover:text-white'
                  }`
                }
              >
                <link.icon className="w-6 h-6 me-4" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <button className="flex items-center w-full p-3 rounded-lg transition-colors duration-200 text-lg text-gray-500 hover:bg-red-500 hover:text-white">
          <LogoutIcon className="w-6 h-6 me-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
