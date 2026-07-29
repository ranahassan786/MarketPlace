import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setSelectedCategory,
  setLimit,
  setSortBy,
  setOrder,
  setSkip,
  clearFilters,
} from "../Redux/features/products/productSlice";
import {selectProducts,
  selectCategories,
  selectProductsStatus,
  selectSearch,
  selectSelectedCategory,
  selectLimit,
  selectSkip,
  selectTotalProducts,
  selectSortBy,
  selectOrder
} from "../Redux/selectors/Selectors";
import { fetchCategories, fetchProducts } from "../Redux/features/products/productService";
import HeroSectionScreen from "../screens/HeroSectionScreen";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const status = useSelector(selectProductsStatus);
  const search = useSelector(selectSearch);
  const selectedCategory = useSelector(selectSelectedCategory);
  const limit = useSelector(selectLimit);
  const skip = useSelector(selectSkip);
  const totalProducts = useSelector(selectTotalProducts);
  const sortBy = useSelector(selectSortBy);
  const order = useSelector(selectOrder);

  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

 
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const clearSearch = () => {
    dispatch(setSearch(""));
  };

  const handleApply = (limitValue) => {
    const numLimit = Number(limitValue) || limit;
    dispatch(setLimit(numLimit));
    dispatch(
      fetchProducts({
        search,
        category: selectedCategory,
        limit: numLimit,
        skip,
        sortBy,
        order,
      })
    );
  };

  const handleSort = (sortValue, orderValue) => {
    dispatch(setSortBy(sortValue));
    dispatch(setOrder(orderValue));
  };

  const handleCategorySelect = (slug) => {
    dispatch(setSelectedCategory(slug));
  };

  const clearFilter = () => {
    dispatch(clearFilters());
    dispatch(fetchProducts({}));
  };

  return (
    <HeroSectionScreen
      products={products}
      categories={categories}
      loading={status === "loading"}
      searchLoading={status === "loading"}
      search={search}
      limit={limit}
      skip={skip}
      setSearch={(value) => dispatch(setSearch(value))}
      handleKeyDown={handleKeyDown}
      clearSearch={clearSearch}
      handleApply={handleApply}
      setSkip={(value) => dispatch(setSkip(value))}
      clearFilter={clearFilter}
      navigate={navigate}
      sortBy={sortBy}
      order={order}
      handleSort={handleSort}
      handleCategorySelect={handleCategorySelect}
      selectedCategory={selectedCategory}
    />
  );
};

export default HeroSection;

