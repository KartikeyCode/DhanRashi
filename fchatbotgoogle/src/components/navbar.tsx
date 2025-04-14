import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-4xl font-bold text-gray-800 dark:text-white">
              ChattyBot
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/dashboard" text="Dashboard" />
            <NavLink href="/transactions" text="Transactions" />
            <NavLink href="/analytics" text="Analytics" />
            <NavLink href="/settings" text="Settings" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-800 dark:text-white hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink href="/dashboard" text="Dashboard" />
          <MobileNavLink href="/transactions" text="Transactions" />
          <MobileNavLink href="/analytics" text="Analytics" />
          <MobileNavLink href="/settings" text="Settings" />
        </div>
      </div>
    </nav>
  );
};

// Component for desktop navigation links
const NavLink = ({ href, text }: { href: string; text: string }) => (
  <Link
    href={href}
    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {text}
  </Link>
);

// Component for mobile navigation links
const MobileNavLink = ({ href, text }: { href: string; text: string }) => (
  <Link
    href={href}
    className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
  >
    {text}
  </Link>
);

export default Navbar;