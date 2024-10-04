import React from "react";
import { MENU_ITEMS } from "../constants";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed md:block hidden w-64 h-screen text-center border-r-2 border-slate-300 ">
        <div
          className="cursor-pointer max-md:py-5 py-10 border-b-2 border-slate-300 text-gray-600 text-2xl font-bold"
          onClick={() => {
            navigate("/");
          }}
        >
          Green River
        </div>
        {MENU_ITEMS.slice(0, 4)?.map((item, index) => (
          <div
            key={index}
            className="m-auto flex items-center space-x-2 mx-3 cursor-pointer border-2 border-slate-500 font-medium text-gray-600 mt-5 px-12 py-2 rounded hover:bg-gradient-to-r from-emerald-900 to-emerald-600 hover:text-white"
            onClick={() => {
              navigate(item?.route);
            }}
          >
            <div>{item.icon}</div>
            <div className="text-base ml-2">{item?.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBar;
