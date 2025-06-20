import React from 'react';
import { Link } from 'react-router-dom'; // Using Link for consistency, though href="#" for non-app routes
import { LifeBuoy, FileText, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  // Routes for these informational pages are not in App.tsx, so using #
  // In a real app, these would point to actual pages like /privacy-policy
  const footerLinks = [
    { name: 'Privacy Policy', href: '#', icon: ShieldCheck },
    { name: 'Terms of Service', href: '#', icon: FileText },
    { name: 'Contact/Support', href: '#', icon: LifeBuoy },
  ];

  return (
    <footer className="bg-slate-100 border-t border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              &copy; {currentYear} MediTrack. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              Your friendly health companion.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-slate-600 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
                // If these were external links or actual non-SPA pages, use <a>
                onClick={(e) => { if (link.href === '#') e.preventDefault(); }}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;