'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Correctly import usePathname from next/navigation
import Link from 'next/link';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState<string>('All Recipes');
  const pathname = usePathname(); // Use usePathname for current path

  useEffect(() => {
    if (pathname === '/pages/favorites') {
      setActiveTab('Favorites');
    } else if (pathname === 'pages/homepage') {
      setActiveTab('All Recipes');
    }
  }, [pathname]); // Watch pathname for changes

  return (
    <div className="flex border-b border-gray-300">
      <Link href="recipes">
        <div
          className={`px-4 py-2 ${
            activeTab === 'All Recipes'
              ? 'text-black border-b-2 border-purple-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('All Recipes')}
        >
          All Recipes
        </div>
      </Link>
      <Link href="favorites">
        <div
          className={`px-4 py-2 ${
            activeTab === 'Favorites'
              ? 'text-black border-b-2 border-purple-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('Favorites')}
        >
          Favorites
        </div>
      </Link>
    </div>
  );
};

export default NavBar;