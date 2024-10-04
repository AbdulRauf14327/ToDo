import React from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { MENU_ITEMS } from "../constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("accessToken");
  const handleLogout = () => {
    localStorage.clear("accessToken");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-emerald-800 md:w-[calc(100vw-16rem)] w-full md:ml-[16rem] h-16 flex justify-between items-center z-10 top-0 fixed">
        <div className="  w-full flex items-center md:space-x-8 text-xl font-medium text-white md:ml-20">
          <IoIosArrowBack
            className="md:block hidden cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="md:block hidden"> Control Panel</div>
          <div className="w-full flex justify-between items-center md:hidden">
            <div className=" ml-5">NavBar</div>
            <div className=" mr-5">
              <button
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <IoMenu />
              </button>
              {open && (
                <div className="bg-emerald-800 w-screen absolute left-0 mt-5 px-5">
                  {MENU_ITEMS?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center py-2"
                      onClick={() => {
                        navigate(item?.route);
                      }}
                    >
                      <div>{item.icon}</div>
                      <div className="text-base ml-2">{item?.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          {isAuthenticated ? (
            <button
              className="md:block hidden bg-white px-5 py-1 text-gray-600 rounded mr-20"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="md:block hidden bg-white px-5 py-1 text-gray-600 rounded mr-20"
              onClick={() => {
                navigate("./login");
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
