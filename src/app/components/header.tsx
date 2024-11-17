
import { useState, useEffect } from 'react';
import { fetchAllCategory } from '@/app/services/category';

const Header = ({ recipes, setRecipes }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllCategory();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Apply filtering whenever either category or search query changes
        const filtered = recipes.filter((recipe) => {
            const matchesCategory =
                categoryFilter === '' || recipe.categoryName === categoryFilter;
            const matchesSearch =
                searchQuery === '' || recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        setRecipes(filtered)
    }, [searchQuery, categoryFilter, recipes]); 

    const onCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategoryFilter(selectedCategory);
    };
    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    return (
        <div className="w-full px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Recipes</h1>

                <div className="flex flex-1 items-center gap-4 max-w-2xl">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onChange={onCategoryChange}
                        defaultValue=""
                    >
                        <option value="" disabled>Pick a Category</option>
                        {categories.map((category, i) => (
                            <option key={i} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>

                    {/* Free search input */}
                    <input
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Search by recipe name"
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>
            </div>

        </div>

    );
};

export default Header;
