import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Favorites');
  const navigate = useNavigate();

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="flex border-b border-gray-300">
      <button
        className={`px-4 py-2 ${
          activeTab === 'All Recipes'
            ? 'text-black border-b-2 border-purple-500'
            : 'text-gray-500'
        }`}
        onClick={() => handleNavigation('All Recipes', '/all-recipes')}
      >
        All Recipes
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === 'Favorites'
            ? 'text-black border-b-2 border-purple-500'
            : 'text-gray-500'
        }`}
        onClick={() => handleNavigation('Favorites', '/favorites')}
      >
        Favorites
      </button>
    </div>
  );
};

export default NavBar;
