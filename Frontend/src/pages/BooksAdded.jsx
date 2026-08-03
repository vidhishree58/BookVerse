import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import DashboardNavbar from "../components/DashboardNavbar";
import toast from "react-hot-toast";
import API from "../Api";

const BooksAdded = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/users/my-books", {
        headers: {
          Authorization: token,
        },
      });

      setBooks(response.data.books);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch books");
    }
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await API.delete(`/books/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toast.success(response.data.message || "Book deleted successfully!");
      getMyBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-[#120812]">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-5 py-8 sm:py-9">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">
          📚 My Books
        </h1>

        <p className="text-xs sm:text-base text-gray-400 mt-1 sm:mt-2">
          Books that you've shared with the{" "}
          <span className="text-[#a855f7] font-semibold">BookVerse</span>{" "}
          community.
        </p>

        {loading ? (
          <div className="text-center mt-20 text-gray-400 text-sm sm:text-base">
            Loading...
          </div>
        ) : books.length === 0 ? (
          <div className="text-center mt-20 text-gray-400 text-base sm:text-lg">
            You haven't added any books yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 sm:mt-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-[#1b0d1b] border border-[#7808be]/30 rounded-2xl p-3 sm:p-4 shadow-[0_4px_20px_rgba(120,8,190,0.15)] hover:border-[#7808be]/60 transition-all duration-300 flex flex-row sm:flex-col lg:flex-row justify-between w-full h-full gap-3.5 sm:gap-4"
              >
                {/* Cover Image Section */}
                <div
                  className="w-28 sm:w-full lg:w-32 shrink-0 rounded-xl overflow-hidden bg-[#120812] relative shadow-md flex items-center justify-center border border-[#7808be]/20"
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* Background Blur Overlay */}
                  <img
                    src={book.coverImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-30"
                  />

                  {/* Main Uncropped Cover Image */}
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="relative z-10 w-full h-full object-contain p-1"
                  />

                  {/* Rating Badge Overlay */}
                  <div className="absolute top-2 left-2 z-20 bg-[#120812]/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-yellow-400 font-bold flex items-center gap-1 border border-[#7808be]/30 shadow">
                    ⭐ {(book.averageRating || 0).toFixed(1)}
                  </div>
                </div>

                {/* 📝 Content & Action Buttons */}
                <div className="flex flex-col justify-between grow min-w-0 lg:py-1">
                  <div>
                    {/* Title */}
                    <h2
                      className="text-sm sm:text-lg font-bold text-white line-clamp-1 hover:text-[#a855f7] transition"
                      title={book.title}
                    >
                      {book.title}
                    </h2>

                    {/* Author */}
                    <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-1">
                      <span className="font-semibold text-gray-400">
                        Author:
                      </span>{" "}
                      {book.author}
                    </p>

                    {/* Genre */}
                    <p className="text-xs sm:text-sm text-gray-300 mt-0.5 sm:mt-1 line-clamp-1">
                      <span className="font-semibold text-gray-400">
                        Genre:
                      </span>{" "}
                      {book.genre}
                    </p>

                    {/* Mood */}
                    {book.mood && (
                      <p className="text-xs sm:text-sm text-gray-300 mt-0.5 sm:mt-1 line-clamp-1">
                        <span className="font-semibold text-gray-400">
                          Mood:
                        </span>{" "}
                        {book.mood}
                      </p>
                    )}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="mt-3">
                    <div className="text-[11px] sm:text-xs text-gray-400 mb-2">
                      {book.totalRatings || 0} Ratings
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => navigate(`/book/${book._id}`)}
                      className="w-full bg-[#7808be] hover:bg-[#60069a] active:scale-95 text-white py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md shadow-[#7808be]/20"
                    >
                      View Details
                    </button>

                    {/* Edit & Delete Action Row */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => navigate(`/edit-book/${book._id}`)}
                        className="flex-1 flex justify-center items-center gap-1.5 bg-[#2a172a] hover:bg-[#3d1f3d] border border-[#7808be]/30 text-white py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                      >
                        <FaEdit className="text-xs text-[#a855f7]" /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="flex-1 flex justify-center items-center gap-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                      >
                        <FaTrash className="text-xs" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BooksAdded;
