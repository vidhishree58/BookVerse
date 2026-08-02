import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full">
      {/* Cover Image Wrapper - Uniform 3:4 Aspect Ratio across all screens */}
      <div className="w-full aspect-3/4 bg-gray-900 flex items-center justify-center overflow-hidden relative group">
        {/* Blurred background to fill empty spaces smoothly */}
        <img
          src={book.coverImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110"
        />

        {/* Main Cover - Complete view without cutting */}
        <img
          src={book.coverImage}
          alt={book.title}
          className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 shadow-lg"
        />
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-5 flex flex-col grow justify-between">
        <div>
          {/* Title */}
          <h2 className="text-base sm:text-xl font-bold text-gray-800 line-clamp-1">
            {book.title}
          </h2>

          {/* Author */}
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-1">
            <span className="font-semibold">Author:</span> {book.author}
          </p>

          {/* Genre */}
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>

          {/* Mood */}
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
            <span className="font-semibold">Mood:</span> {book.mood}
          </p>
        </div>

        <div>
          {/* Rating */}
          <div className="flex justify-between items-center mt-3 sm:mt-4">
            <span className="text-xs sm:text-sm text-yellow-500 font-semibold flex items-center gap-1">
              ⭐ {(book.averageRating || 0).toFixed(1)}
            </span>

            <span className="text-gray-500 text-xs">
              {book.totalRatings || 0} Ratings
            </span>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate(`/book/${book._id}`)}
            className="mt-3 sm:mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;