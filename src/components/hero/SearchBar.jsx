import { X } from "lucide-react";

const SearchBar = ({ search, setSearch, onKeyDown, onClear }) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="Search products ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full border-2 border-indigo-500 p-3 pr-10 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
      />
      {search && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors duration-200"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

