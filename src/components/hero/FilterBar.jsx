import { useState } from "react";
import { X, ListFilterPlus } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";
import SortDropdown from "./SortDropdown";
import LimitInput from "./LimitInput";

const FilterBar = ({
  search,
  categories,
  selectedCategory,
  sortBy,
  onApply,
  onClearFilter,
  onSelectCategory,
  onSort,
}) => {
  const [inputLimit, setInputLimit] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasAnyFilter = search || inputLimit || selectedCategory || sortBy;

  const handleApply = () => {
    onApply(inputLimit);
    setMobileOpen(false);
  };

  const handleClearFilter = () => {
    setInputLimit("");
    onClearFilter();
    setMobileOpen(false);
  };

  const filterControls = (
    <>
      <LimitInput
        value={inputLimit}
        onChange={setInputLimit}
      />
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <SortDropdown onSort={onSort} />
      <button
        onClick={handleApply}
        className="border-2 border-indigo-700 p-3 h-10 rounded-md text-white bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 flex items-center gap-2 cursor-pointer font-medium text-sm"
      >
        Apply
      </button>
      <button
        onClick={handleClearFilter}
        disabled={!hasAnyFilter}
        className={`border-2 border-indigo-700 p-3 h-10 rounded-md text-red-600 transition-all 
            duration-200 flex items-center gap-2 cursor-pointer ${!hasAnyFilter
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        Clear Filter <X size={10} />
      </button>
    </>
  );

  return (
    <>
      {/* Desktop: inline filters (hidden on screens <= 750px) */}
      <div className="hidden md:flex items-center gap-2">
        {filterControls}
      </div>

      {/* Mobile: Filters toggle button (visible on screens <= 750px) */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="border-2 border-indigo-700 p-3 h-10 rounded-md text-indigo-700 hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2 cursor-pointer font-medium text-sm"
        >
          <ListFilterPlus size={18} />
          Filters
        </button>
        {mobileOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20 p-4 flex flex-col gap-3">
            {filterControls}
          </div>
        )}
      </div>
    </>
  );
};

export default FilterBar;

