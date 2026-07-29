import { useState } from "react";
import { ListSortDescending } from "lucide-react";

const SortDropdown = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 text-gray-700 px-3 py-3 h-10 rounded-md hover:bg-gray-300 border-2 border-indigo-500 transition-all duration-200 font-semibold cursor-pointer whitespace-nowrap flex items-center gap-2"
      >
        <ListSortDescending size={18} />
        <span>{selectedSort || "Sort"}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={() => {
              onSort("title", "asc");
              setSelectedSort("Ascending");
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Ascending
          </button>
          <button
            onClick={() => {
              onSort("title", "desc");
              setSelectedSort("Descending");
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Descending
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;

