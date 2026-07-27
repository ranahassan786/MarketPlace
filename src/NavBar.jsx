import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { GetApi } from "./ApiMethod";
import { userApi } from "./Routes";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const effectRan = useRef(false);

  useEffect(() => {
   
    if (effectRan.current === false) {
      const fetchUser = async () => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          return;
        }

        try {
          const data = await GetApi(userApi, accessToken);
          setUser(data);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchUser();

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/Login");
  };

  return (
    <nav
      className="flex justify-between items-center w-full ps-5 pe-5 h-[70px] bg-white shadow-lg"
    >

      <h2 className="text-4xl font-bold tracking-wide text-indigo-500 cursor-pointer">
        MarketPlace
      </h2>


      <div className="flex items-center gap-10 text-lg hidden md:flex">
        <span className="cursor-pointer hover:text-indigo-500 hover:underline">
          Home
        </span>

        <span className="cursor-pointer hover:text-indigo-500 hover:underline">
          About
        </span>

        <span className="cursor-pointer hover:text-indigo-500 hover:underline">
          Contact
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 cursor-pointer overflow-hidden"
        >
          {user?.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
              {user ? user.firstName?.[0] || user.username?.[0] || "U" : "U"}
            </div>
          )}
        </button>

        {open && (
          <div className="absolute right-0 top-16 w-72 bg-white rounded-lg shadow-lg border overflow-hidden ">


            <button
              type="button"
              className="w-full text-left p-5 hover:bg-gray-100 transition duration-200 border-b cursor-pointer"
            >
              <div className="flex flex-col items-center">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-xl mb-3">
                    {user ? user.firstName?.[0] || user.username?.[0] || "U" : "U"}
                  </div>
                )}

                <h3 className="font-semibold text-gray-900">
                  {user
                    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || "User"
                    : "Loading..."}
                </h3>
                <p className="text-sm text-gray-500">{user?.email || "Loading..."}</p>
              </div>
            </button>


            <button
              onClick={logOut}
              className="w-full flex items-center gap-3 p-4 text-red-600 hover:bg-gray-100 
                         transition duration-200 cursor-pointer"
            >
              <LogOut size={20} />
              Logout
            </button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;