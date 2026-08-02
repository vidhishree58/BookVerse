import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#131525] border border-purple-900/30 rounded-2xl p-3 sm:p-4 shadow-lg hover:border-purple-500/50 transition-all duration-300 flex flex-row sm:flex-col justify-between w-full h-full gap-3.5 sm:gap-4">
      
      {/* Image Section */}
      {/* Mobile: Fixed width 112px | Desktop: Full width with ample height */}
      <div className="w-28 sm:w-full aspect-3/4 shrink-0 rounded-xl overflow-hidden bg-gray-900/80 relative shadow-md flex items-center justify-center">
        {/* Background blur overlay so full image fits naturally without empty borders */}
        <img
          src={book.coverImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-30"
        />
        
        <img
          src={book.coverImage}
          alt={book.title}
          className="relative z-10 w-full h-full object-contain p-1"
        />
        {/* Rating Badge Overlay */}
        <div className="absolute top-2 left-2 z-20 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-yellow-400 font-bold flex items-center gap-1 border border-white/10 shadow">
          ⭐ {(book.averageRating || 0).toFixed(1)}
        </div>
      </div>

      {/* 📝 Content Section */}
      {/* Mobile: Right Side | Desktop: Below Image */}
      <div className="flex flex-col justify-between grow min-w-0">
        <div>
          {/* Title */}
          <h2 className="text-sm sm:text-lg font-bold text-white line-clamp-1 group-hover:text-purple-400 transition" title={book.title}>
            {book.title}
          </h2>

          {/* Author */}
          <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-1">
            <span className="font-semibold text-gray-400">Author:</span> {book.author}
          </p>

          {/* Genre */}
          <p className="text-xs sm:text-sm text-gray-300 mt-0.5 sm:mt-1 line-clamp-1">
            <span className="font-semibold text-gray-400">Genre:</span> {book.genre}
          </p>

          {/* Mood */}
          {book.mood && (
            <p className="text-xs sm:text-sm text-gray-300 mt-0.5 sm:mt-1 line-clamp-1">
              <span className="font-semibold text-gray-400">Mood:</span> {book.mood}
            </p>
          )}
        </div>

        {/* Footer (Rating count & Button) */}
        <div className="mt-3">
          <div className="text-[11px] sm:text-xs text-gray-400 mb-2">
            {book.totalRatings || 0} Ratings
          </div>

          <button
            onClick={() => navigate(`/book/${book._id}`)}
            className="w-full bg-[#6C47FF] hover:bg-purple-600 active:scale-95 text-white py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md shadow-purple-600/20"
          >
            View Details
          </button>
        </div>
      </div>

    </div>
  );
};

export default BookCard;