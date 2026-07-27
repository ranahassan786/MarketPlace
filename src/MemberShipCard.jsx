const MemberShipCard = () => {
  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto bg-indigo-300 rounded-3xl px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-16 flex
                     flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10">
        <div className="w-full lg:w-auto lg:max-w-xl text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold cursor-pointer text-black leading-tight">
            Join the Elite MarketPlace Community
          </h2>

          <p className="mt-4 sm:mt-5 text-gray-700 text-base sm:text-lg md:text-xl cursor-pointer leading-relaxed">
            Get exclusive early access to new collections and enjoy 10% off
            your first order.
          </p>
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full sm:w-auto sm:flex-1 lg:w-[320px] bg-white rounded-2xl px-4 sm:px-6 
                       py-3 sm:py-5 text-base sm:text-lg outline-none"/>

          <button className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-700 text-white font-semibold
           px-6 sm:px-10 py-3 sm:py-5 cursor-pointer rounded-2xl duration-300 whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemberShipCard;