const EmptyState = ({ search }) => {
  return (
    <div className="text-center mt-8">
      <p className="text-gray-500 text-lg">No products found for "{search}"</p>
    </div>
  );
};

export default EmptyState;

