import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaPlus, FaBookOpen, FaSmile, FaStar } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  // Added handleLogout function to fix the error
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 h-16 bg-[#160b16] border-b border-[#7808be] px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-8">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-3xl text-white hover:text-[#6C47FF] transition"
          >
            <HiOutlineMenu />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            <Link
              to="/add-book"
              className="flex items-center gap-2 text-lg text-white hover:text-[#47ff78] transition"
            >
              <FaPlus />
              <span>Add Book</span>
            </Link>

            <Link
              to="/genres"
              className="flex items-center gap-2 text-lg text-white hover:text-[#47e3ff] transition"
            >
              <FaBookOpen />
              <span>Genres</span>
            </Link>

            <Link
              to="/mood-hub"
              className="flex items-center gap-2 text-lg text-white hover:text-[#f7fa43] transition"
            >
              <FaSmile />
              <span>Mood Hub</span>
            </Link>

            <Link
              to="/top-rated"
              className="flex items-center gap-2 text-lg text-white hover:text-[#ffd447] transition"
            >
              <FaStar />
              <span>Top Rated</span>
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <div className="relative mt-2">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="text-3xl text-white hover:text-[#3c4cfc] transition"
            >
              <FaRegUserCircle />
            </button>

            {showProfile && <ProfileDropdown />}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-lg font-bold text-white hover:text-red-400 transition"
          >
            <FiLogOut className="text-xl" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-65 bg-[#160b16] border-r border-[#7808be] transform transition-transform duration-300 z-50 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-center gap-25 p-3">
          <Link to="/dashboard" className="text-2xl font-bold tracking-tight">
            <span className="text-white">Book</span>
            <span className="text-[#6C47FF]">Verse</span>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl text-white hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-8 px-6 mt-6">
          <Link
            to="/add-book"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-lg text-white hover:text-[#47ff78] transition"
          >
            <FaPlus />
            Add Book
          </Link>

          <Link
            to="/genres"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-lg text-white hover:text-[#47e3ff] transition"
          >
            <FaBookOpen />
            Genres
          </Link>

          <Link
            to="/mood-hub"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-lg text-white hover:text-[#f7fa43] transition"
          >
            <FaSmile />
            Mood Hub
          </Link>

          <Link
            to="/top-rated"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-lg text-white hover:text-[#ffd447] transition"
          >
            <FaStar />
            Top Rated
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;