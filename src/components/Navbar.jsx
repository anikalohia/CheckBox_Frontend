import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const location = useLocation();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/task" },
    ...(isLoggedIn ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 border-b-[3px] border-black bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#33A1E0] border-[3px] border-black shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center transition-transform group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none">
            <span className="text-black font-black text-2xl">🎯</span>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">
            CheckBox
          </span>
        </Link>

        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm font-black uppercase tracking-widest transition-all hover:bg-[#FFDE63] px-3 py-1 border-[3px] border-transparent hover:border-black hover:shadow-[4px_4px_0px_0px_#000000] ${
                    location.pathname === link.path ? "bg-[#FFDE63] border-black shadow-[4px_4px_0px_0px_#000000]" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <a
                href={`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/auth/logout`}
                className="neo-btn bg-[#E06B80] text-sm"
              >
                Logout
              </a>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-black uppercase tracking-widest hover:underline decoration-[3px]"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="neo-btn bg-[#8ABB6C] text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
