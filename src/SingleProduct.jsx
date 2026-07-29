import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetApi } from "./util/ApiMethod";
import { SingleProductApi } from "./util/Routes";
import { Star, ChevronLeft, ShoppingCart, Zap } from "lucide-react";
import { addToCart } from "./Redux/features/cart/cartSlice";
import NavBar from "./NavBar";
import Footer from "./Footer";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await GetApi(SingleProductApi(id));
        setProduct(data);
        setSelectedImage(0);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  }; 

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}

        {hasHalf && (
          <div className="relative">
            <Star size={16} className="text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-gray-300" />
        ))}
      </div>
    );
  };

    const SkeletonLoader = () => (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-10 w-32 bg-gray-200 rounded-lg mb-8" />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-square bg-gray-200 rounded-2xl" />
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>


          <div className="w-full lg:w-1/2 space-y-6">
            <div className="h-4 w-20 bg-gray-200 rounded-full" />
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
            <div className="flex items-center gap-3">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
            <div className="h-8 w-40 bg-gray-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
            <div className="flex gap-4">
              <div className="h-14 w-48 bg-gray-200 rounded-xl" />
              <div className="h-14 w-48 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-lg mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">Oops</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Product Not Found
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            {error || "The product you are looking for does not exist or has been removed."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-colors duration-300 cursor-pointer"
          >
            <ChevronLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;
  if (error || !product) return <ErrorState />;

  const images = product.images || [product.thumbnail];
  const reviews = product.reviews || [];
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating?.toFixed(1) || "0.0";

  const detailsCards = [
    { label: "SKU", value: product.sku },
    { label: "Weight", value: product.weight ? `${product.weight} g` : null },
    { label: "Dimensions", value: product.dimensions ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm` : null },
    { label: "Warranty", value: product.warrantyInformation },
    { label: "Shipping", value: product.shippingInformation },
    { label: "Return Policy", value: product.returnPolicy },
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Availability", value: product.availabilityStatus },
    { label: "Minimum Order", value: product.minimumOrderQuantity ? `Qty: ${product.minimumOrderQuantity}` : null },
    { label: "Barcode", value: product.meta?.barcode },
  ].filter((card) => card.value);

  return (
    <>
      <NavBar />
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-black bg-indigo-400 hover:bg-indigo-900 
                        font-medium mb-6 sm:mb-8 transition-colors duration-200 rounded-xl
                         px-6 py-3 cursor-pointer group"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </button>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={images[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${selectedImage === index
                        ? "border-indigo-500 shadow-md ring-2 ring-indigo-200"
                        : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-5">
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium w-fit">
                {product.category}
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={product.rating || 0} />
                  <span className="text-gray-700 font-semibold text-sm">
                    ({product.rating?.toFixed(1) || "0.0"})
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 text-sm">
                  {reviews.length > 0
                    ? `${reviews.length} review${reviews.length !== 1 ? "s" : ""}`
                    : "No reviews yet"}
                </span>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-indigo-700">
                  ${product.price?.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg sm:text-xl text-gray-400 line-through">
                      $
                      {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                        2
                      )}
                    </span>
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {product.discountPercentage.toFixed(0)}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {product.description}
              </p>

              {product.stock !== undefined && (
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span
                    className={`font-medium text-sm ${product.stock > 0 ? "text-green-700" : "text-red-600"}`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock} available)`
                      : "Out of Stock"}
                  </span>
                </div>
              )}

              <div className="flex gap-4 mt-2 flex-wrap">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg flex-1 sm:flex-none"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-[#DBE2FA] text-indigo-700 border-2 border-indigo-700 font-semibold px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg flex-1 sm:flex-none">
                  <Zap size={20} />
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {detailsCards.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Product Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {detailsCards.map((card) => (
                  <div
                    key={card.label}
                    className="bg-indigo-50 rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    <p className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
                      {card.label}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 capitalize">
                      {card.label === "Dimensions" && product.dimensions
                        ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
                        : card.value || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 sm:mt-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <StarRating rating={parseFloat(avgRating)} />
                    <span className="font-semibold text-gray-800 ml-1">
                      {avgRating}
                    </span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500 text-sm">
                    {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg w-fit">
                Write a Review
              </button>
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-5">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-indigo-50 rounded-xl shadow-lg p-5 sm:p-6 border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {review.reviewerEmail ? (
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              review.reviewerName
                            )}&background=6366f1&color=fff`}
                            alt={review.reviewerName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-indigo-600 font-bold text-lg">
                            {review.reviewerName?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900">
                            {review.reviewerName}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="mb-2">
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                <p className="text-gray-500 text-lg">No reviews yet for this product.</p>
                <p className="text-gray-400 text-sm mt-1">
                  Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
