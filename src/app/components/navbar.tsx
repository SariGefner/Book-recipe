'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; 

const NavBar = () => {
  const [activeTab, setActiveTab] = useState<string>('All Recipes');
  const pathname = usePathname(); 
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/favorites') {
      setActiveTab('Favorites');
    } else if (pathname === '/') {
      setActiveTab('All Recipes');
    }
  }, [pathname]); 

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'All Recipes') {
      router.push('/pages/all-recipes');
    } else {
      router.push(`/pages/favorutes}`);
    }
  };

  return (
    <div className="flex border-b border-gray-300">
      <div
        className={`px-4 py-2 cursor-pointer ${
          activeTab === 'All Recipes'
            ? 'text-black border-b-2 border-purple-500'
            : 'text-gray-500'
        }`}
        onClick={() => handleTabClick('All Recipes')}
      >
        All Recipes
      </div>
      <div
        className={`px-4 py-2 cursor-pointer ${
          activeTab === 'Favorites'
            ? 'text-black border-b-2 border-purple-500'
            : 'text-gray-500'
        }`}
        onClick={() => handleTabClick('Favorites')}
      >
        Favorites
      </div>
    </div>
  );
};

export default NavBar;