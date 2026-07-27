import { useState, useMemo } from "react";

const CategoryDropdown = ({ categories, selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedName = useMemo(() => {
    if (!selectedCategory) return null;
    const cat = categories.find((c) => c.slug === selectedCategory);
    return cat ? cat.name || cat.slug : null;
  }, [categories, selectedCategory]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 text-gray-700 px-3 py-3 h-10 rounded-md hover:bg-gray-300 border-2 border-indigo-700 transition-all duration-200 font-semibold cursor-pointer whitespace-nowrap flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span>{selectedName || "Categories"}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                onSelectCategory(cat.slug);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                selectedCategory === cat.slug
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.name || cat.slug}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;

