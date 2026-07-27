const Footer = () => {
  return (
    <div className="bg-indigo-200 text-black py-8 px-4 sm:px-10">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <p className="text-xs sm:text-sm">
            <span className="cursor-pointer block sm:inline">© 2026 MarketPlace.</span>
            <span className="cursor-pointer block sm:inline"> All rights reserved.</span>
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-end">
            <a href="#" className="text-xs sm:text-sm hover:text-indigo-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs sm:text-sm hover:text-indigo-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs sm:text-sm hover:text-indigo-400 transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;