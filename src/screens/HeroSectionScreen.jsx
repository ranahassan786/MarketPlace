import HeroHeader from "../components/hero/HeroHeader";
import SearchBar from "../components/hero/SearchBar";
import FilterBar from "../components/hero/FilterBar";
import LoadingSpinner from "../components/hero/LoadingSpinner";
import EmptyState from "../components/hero/EmptyState";
import ProductGrid from "../components/hero/ProductGrid";

const HeroSectionScreen = ({
  products,
  categories,
  loading,
  searchLoading,
  search,
  setSearch,
  handleKeyDown,
  clearSearch,
  setLimit,
  clearFilter,
  navigate,
  handleSort,
  handleCategorySelect,
  selectedCategory,
  sortBy,
  handleApply,
}) => {
  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <HeroHeader />

        <div className="w-full flex justify-center mt-8 sm:mt-10">
          <div className="relative w-full max-w-[1000px] flex items-center gap-2">
            <SearchBar
              search={search}
              setSearch={setSearch}
              onKeyDown={handleKeyDown}
              onClear={clearSearch}
            />
            <FilterBar
              search={search}
              categories={categories}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onApply={handleApply}
              onClearFilter={clearFilter}
              onSelectCategory={handleCategorySelect}
              onSort={handleSort}
            />
          </div>
        </div>

        {searchLoading && <LoadingSpinner />}

        {!searchLoading && search && products.length === 0 && (
          <EmptyState search={search} />
        )}

        <ProductGrid
          products={products}
          categories={categories}
          navigate={navigate}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default HeroSectionScreen;

