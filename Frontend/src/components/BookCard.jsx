import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1b0d1b] border border-[#7808be]/30 rounded-2xl p-3 sm:p-4 shadow-[0_4px_20px_rgba(120,8,190,0.15)] hover:border-[#7808be]/60 transition-all duration-300 flex flex-row sm:flex-col lg:flex-row justify-between w-full h-full gap-3.5 sm:gap-4 group">
      
      {/* Image Section */}
      <div
        className="w-28 sm:w-full lg:w-32 shrink-0 rounded-xl overflow-hidden bg-[#120812] relative shadow-md flex items-center justify-center border border-[#7808be]/20"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Background Blur */}
        <img
          src={book.coverImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-30"
        />

        {/* Main Cover */}
        <img
          src={book.coverImage}
          alt={book.title}
          className="relative z-10 w-full h-full object-contain p-1"
        />

        {/* Rating Badge */}
        <div className="absolute top-2 left-2 z-20 bg-[#120812]/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-yellow-400 font-bold flex items-center gap-1 border border-[#7808be]/30 shadow">
          ⭐ {(book.averageRating || 0).toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between grow min-w-0 lg:py-1">
        <div>
          {/* Title */}
          <h2
            className="text-sm sm:text-lg lg:text-xl font-bold text-white line-clamp-1 group-hover:text-[#a855f7] transition"
            title={book.title}
          >
            {book.title}
          </h2>

          {/* Author */}
          <p className="text-xs sm:text-sm text-gray-300 mt-2 line-clamp-1">
            <span className="font-semibold text-gray-400">Author:</span>{" "}
            {book.author}
          </p>

          {/* Genre */}
          <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-1">
            <span className="font-semibold text-gray-400">Genre:</span>{" "}
            {book.genre}
          </p>

          {/* Mood */}
          {book.mood && (
            <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-1">
              <span className="font-semibold text-gray-400">Mood:</span>{" "}
              {book.mood}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4">
          <div className="text-[11px] sm:text-xs text-gray-400 mb-2">
            {book.totalRatings || 0} Ratings
          </div>

          <button
            onClick={() => navigate(`/book/${book._id}`)}
            className="w-full bg-[#7808be] hover:bg-[#60069a] active:scale-95 text-white py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md shadow-[#7808be]/20"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;