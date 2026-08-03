import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ixed top-0 left-0 w-full bg-[#0b0c16] border-b border-[#6C47FF]/50 z-50">
      <div className="p-5 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-15">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            <span className="text-white">Book</span>
            <span className="text-[#7808be]">Verse</span>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-lg font-semibold text-white hover:text-gray-300 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-lg font-semibold text-white hover:text-gray-300 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Right Side: Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-1.5 rounded-md border border-gray-500/60 text-white text-lg font-medium transition-all hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-1.5 rounded-md bg-[#7808be] text-white text-lg font-medium transition-all hover:bg-[#5835e3] shadow-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b0c16] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-white text-sm font-medium hover:text-gray-300"
            >
              Home
            </Link>
            <a
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-white text-sm font-medium hover:text-gray-300"
            >
              About
            </a>
          </nav>

          <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-full py-2 rounded-md border border-gray-500/60 text-white text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-full py-2 rounded-md bg-[#7808be] text-white text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;