import { Link } from "react-router-dom";
import { FaBook, FaCommentDots } from "react-icons/fa";

const ProfileDropdown = () => {
  return (
    <div className="absolute right-0 mt-3 w-45 bg-[#160b16] border border-white rounded-xl shadow-2xl overflow-visible z-50">
      
      {/* Arrow pointing up towards the profile icon */}
      <div className="absolute -top-2 right-4 w-4 h-4 bg-[#160b16] border-t border-l border-white transform rotate-45"></div>

      {/* Dropdown Content */}
      <div className="relative bg-[#160b16] rounded-xl overflow-hidden">
        <Link
           to="/my-books"
          className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-[#251325] transition"
        >
          <FaBook className="text-white" />
          <span>Books Added</span>
        </Link>

        <Link
          to="/my-comments"
          className="flex items-center gap-3 px-4 py-2.5 text-white hover:bg-[#251325] transition"
        >
          <FaCommentDots className="text-white" />
          <span>My Comments</span>
        </Link>
      </div>

    </div>
  );
};

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;