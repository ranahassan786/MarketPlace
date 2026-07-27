const LimitInput = ({ value, onChange }) => {
  return (
    <input
      type="number"
      placeholder="Limit"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="w-20 border-2 border-indigo-700 p-3 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-center"
      min="1"
    />
  );
};

export default LimitInput;

