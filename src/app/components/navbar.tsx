'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState<string>('All Recipes');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes('/pages/favorites')) {
      setActiveTab('Favorites');
    } else if (pathname?.includes('/pages/recipes')) {
      setActiveTab('All Recipes');
    }
  }, [pathname]);

  return (
    <nav className="w-full">
      <div className="flex border-b border-gray-300">
        <Link 
          href="/pages/recipes"
          className={`px-4 py-2 cursor-pointer ${
            activeTab === 'All Recipes'
              ? 'text-black border-b-2 border-purple-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('All Recipes')}
        >
          All Recipes
        </Link>
        <Link 
          href="/pages/favorites"
          className={`px-4 py-2 cursor-pointer ${
            activeTab === 'Favorites'
              ? 'text-black border-b-2 border-purple-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('Favorites')}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;