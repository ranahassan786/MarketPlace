const SkeletonCard = () => {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg animate-pulse">
      <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200"></div>
      <div className="p-4 sm:p-5 md:p-6">
        <div className="w-1/2 h-3 bg-gray-200 mb-2"></div>
        <div className="w-1/3 h-3 bg-gray-200 mb-2"></div>
        <div className="w-1/4 h-3 bg-gray-200"></div>
      </div>
    </div>
  );
};

const Products = ({ products, categories, navigate, loading }) => {
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-12 place-items-center">
        {[...Array(20)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-12 place-items-center">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full max-w-sm bg-white rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl duration-300 overflow-hidden"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />

          <div className="p-4 sm:p-5 md:p-6">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm inline-block">
              {categoryMap[product.category] || product.category}
            </span>

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-3 sm:mt-4 line-clamp-1 text-gray-900">
              {product.title}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mt-2 sm:mt-3 h-[56px] line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
              {product.discountPercentage && (
                <span className="line-through text-gray-400 text-sm sm:text-base">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
              <span className="text-indigo-700 text-xl sm:text-2xl font-bold">
                ${product.price}
              </span>
              {product.discountPercentage && (
                <span className="bg-indigo-500 text-white px-2 py-1 rounded text-xs sm:text-sm ml-auto">
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

