import { useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "./Redux/features/cart/cartSlice";

const SkeletonCard = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg animate-pulse flex flex-col h-full">
      <div className="w-full h-52 sm:h-60 md:h-64 lg:h-60 xl:h-64 flex-shrink-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"></div>
      <div className="p-4 sm:p-5 md:p-6 lg:p-5 xl:p-6 flex flex-col flex-1 min-h-0">
        <div className="w-20 h-5 bg-gray-200 rounded-full mb-2.5 flex-shrink-0"></div>
        <div className="w-full h-6 sm:h-7 md:h-8 lg:h-7 xl:h-8 bg-gray-200 rounded mt-1 mb-2.5 flex-shrink-0"></div>
        <div className="w-full h-4 bg-gray-200 rounded mb-1.5 flex-shrink-0"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded mb-5 flex-shrink-0"></div>
        <div className="flex items-center gap-2 h-10 mb-4 flex-shrink-0">
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
          <div className="ml-auto w-[5.5rem] h-8 bg-gray-200 rounded-md"></div>
        </div>
        <div className="mt-auto w-full h-10 sm:h-11 bg-gray-200 rounded-xl flex-shrink-0"></div>
      </div>
    </div>
  );
};

const Products = ({ products, categories, navigate, loading }) => {
  const dispatch = useDispatch();
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-5 xl:gap-6 mt-10 sm:mt-12 items-stretch">
        {[...Array(20)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-5 xl:gap-6 mt-10 sm:mt-12 items-stretch">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full bg-white rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl duration-300 overflow-hidden flex flex-col h-full"
        >
          <div className="w-full h-52 sm:h-60 md:h-64 lg:h-60 xl:h-64 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-5 lg:p-4 xl:p-5">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-w-full max-h-full object-contain w-auto h-auto"
            />
          </div>

          <div className="p-4 sm:p-5 md:p-6 lg:p-5 xl:p-6 flex flex-col flex-1 min-h-0">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium self-start flex-shrink-0 h-5 flex items-center whitespace-nowrap overflow-hidden">
              <span className="truncate">{categoryMap[product.category] || product.category}</span>
            </span>

            <h2 className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-bold mt-2.5 sm:mt-3 line-clamp-2 text-gray-900 min-h-[2.75rem] sm:min-h-[3.25rem] md:min-h-[3.5rem] lg:min-h-[3rem] xl:min-h-[3.5rem] flex-shrink-0 flex items-start leading-tight">
              {product.title}
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm md:text-sm lg:text-xs xl:text-sm mt-2 sm:mt-2.5 line-clamp-2 leading-relaxed min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3rem] lg:min-h-[2.5rem] xl:min-h-[3rem] flex-shrink-0 overflow-hidden">
              {product.description}
            </p>

            <div className="mt-3.5 sm:mt-4 lg:mt-3.5 xl:mt-4 flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-2 xl:gap-3 h-10 flex-shrink-0">
              <span className="w-16 sm:w-[5rem] md:w-[5rem] lg:w-16 xl:w-[5rem] flex-shrink-0">
                {product.discountPercentage ? (
                  <span className="line-through text-gray-400 text-[11px] sm:text-xs tabular-nums">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                ) : (
                  <span className="text-[11px] sm:text-xs text-transparent select-none pointer-events-none tabular-nums">
                    $0000.00
                  </span>
                )}
              </span>
              <span className="text-indigo-700 text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-2xl font-bold tabular-nums flex-shrink-0 leading-none">
                ${product.price?.toFixed(2)}
              </span>
              <span className="ml-auto flex-shrink-0 min-w-[5rem] sm:min-w-[5.5rem] md:min-w-[5.5rem] lg:min-w-[5rem] xl:min-w-[5.5rem] h-8 flex items-center justify-center">
                {product.discountPercentage ? (
                  <span className="bg-indigo-500 text-white w-full h-full px-2 sm:px-2.5 lg:px-2 xl:px-2.5 flex items-center justify-center rounded-md text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                    {product.discountPercentage.toFixed(0)}% OFF
                  </span>
                ) : (
                  <span className="w-full h-full opacity-0 pointer-events-none select-none"></span>
                )}
              </span>
            </div>

            <div className="mt-auto pt-3.5 sm:pt-4 lg:pt-3.5 xl:pt-4 flex-shrink-0">
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="w-full h-10 sm:h-11 flex items-center justify-center gap-1.5 sm:gap-2 bg-indigo-500 hover:bg-indigo-700 text-white text-xs sm:text-sm md:text-base lg:text-sm xl:text-base font-semibold px-3 sm:px-4 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <ShoppingCart size={15} className="sm:hidden lg:block xl:hidden" />
                <ShoppingCart size={16} className="hidden sm:block md:hidden xl:block" />
                <ShoppingCart size={17} className="hidden sm:hidden md:block lg:hidden" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
