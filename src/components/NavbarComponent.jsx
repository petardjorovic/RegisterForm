import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { DiAppcelerator } from "react-icons/di";

function NavbarComponent() {
  return (
    <header className="bg-green-500 h-[80px] flex items-center justify-center">
      <nav className="container mx-auto flex items-center justify-between w-[95%]">
        <h1 className="text-3xl font-bold text-white">
          <DiAppcelerator size={55} />
        </h1>
        <ul className="flex gap-[20px]">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>Products</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-[30px]">
          <Link className="text-white" to={"/register"}>
            Register
          </Link>
          <Link
            to={"/login"}
            className="flex bg-yellow-500 rounded-2xl px-[20px] py-[6px] items-center gap-[5px] hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            <FaRegUser /> Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavbarComponent;
