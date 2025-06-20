import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserCircle, LogOut, Settings, Bell } from 'lucide-react'; // Added Bell for Doraemon touch

const Header: React.FC = () => {
  console.log('Header loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, etc.
    console.log('User logged out');
    navigate('/'); // Navigate to AuthPage
  };

  return (
    <header className="bg-sky-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Bell className="h-7 w-7 text-yellow-300" /> {/* Doraemon's bell */}
          <span className="font-bold text-xl">MediTrack</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Placeholder for notifications or other icons if needed */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0 h-9 w-9 hover:bg-sky-700 focus-visible:ring-sky-400">
                <UserCircle className="h-7 w-7 text-white" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-slate-800">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900 dark:text-slate-50">My Account</p>
                  {/* <p className="text-xs leading-none text-muted-foreground">user@example.com</p> */}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                <Link to="/user-profile" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>User Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50 dark:text-red-400 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/50 dark:focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;