import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Pill, User, Bell } from 'lucide-react';

interface AppSidebarProps {
  // Props can be added here if the sidebar needs to be dynamic, e.g., user role
}

const AppSidebar: React.FC<AppSidebarProps> = () => {
  console.log('AppSidebar loaded');

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/appointments', label: 'Appointments', icon: CalendarDays },
    { to: '/medications', label: 'Medications', icon: Pill },
    { to: '/user-profile', label: 'User Profile', icon: User },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-150 ease-in-out
     ${isActive
       ? 'bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-50'
       : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50'
     }`;

  return (
    <aside className="w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full">
      {/* Optional: Logo/App Name at the top of sidebar */}
      <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 px-4">
        <Link to="/dashboard" className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
          <Bell className="h-6 w-6 text-yellow-400" /> {/* Consistent branding with Header */}
          <span className="font-bold text-lg">MediTrack</span>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={navLinkClasses}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      {/* Optional: Footer section in sidebar, e.g., settings, help */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          Health Management Simplified
        </p>
      </div>
    </aside>
  );
};

export default AppSidebar;