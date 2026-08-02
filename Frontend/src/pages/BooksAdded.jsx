import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import DashboardNavbar from "../components/DashboardNavbar";
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
      alert(error.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await API.delete(`/books/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert(response.data.message);

      getMyBooks();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to delete book"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c16]">
      <DashboardNavbar />

      <main className="max-w-8xl mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">
          📚 My Books
        </h1>

        <p className="text-xs sm:text-base text-gray-300 mt-1 sm:mt-2">
          Books that you've shared with the BookVerse community.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-[#131525] border border-purple-900/30 rounded-2xl p-3 sm:p-4 shadow-lg hover:border-purple-500/50 transition-all duration-300 flex flex-row sm:flex-col justify-between w-full h-full gap-3.5 sm:gap-4"
              >
                {/* Cover Image Section */}
                <div
                  className="w-28 sm:w-full shrink-0 rounded-xl overflow-hidden bg-gray-900/80 relative shadow-md flex items-center justify-center"
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
                  <div className="absolute top-2 left-2 z-20 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-yellow-400 font-bold flex items-center gap-1 border border-white/10 shadow">
                    ⭐ {(book.averageRating || 0).toFixed(1)}
                  </div>
                </div>

                {/* 📝 Content & Action Buttons */}
                <div className="flex flex-col justify-between grow min-w-0">
                  <div>
                    {/* Title */}
                    <h2
                      className="text-sm sm:text-lg font-bold text-white line-clamp-1 hover:text-purple-400 transition"
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
                      className="w-full bg-[#6C47FF] hover:bg-purple-600 active:scale-95 text-white py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md shadow-purple-600/20"
                    >
                      View Details
                    </button>

                    {/* Edit & Delete Action Row */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => navigate(`/edit-book/${book._id}`)}
                        className="flex-1 flex justify-center items-center gap-1.5 bg-blue-600/80 hover:bg-blue-600 text-white py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                      >
                        <FaEdit className="text-xs" /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="flex-1 flex justify-center items-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
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