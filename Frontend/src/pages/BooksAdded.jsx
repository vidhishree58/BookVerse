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

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-white">
          📚 My Books
        </h1>

        <p className="text-gray-300 mt-2">
          Books that you've shared with the BookVerse community.
        </p>

        {loading ? (
          <div className="text-center mt-20 text-gray-400">
            Loading...
          </div>
        ) : books.length === 0 ? (
          <div className="text-center mt-20 text-gray-400 text-lg">
            You haven't added any books yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full"
              >
                {/* Cover Image Container - Aspect 3/4 with Blurred Background */}
                <div className="w-full aspect-3/4 bg-gray-900 flex items-center justify-center overflow-hidden relative group">
                  {/* Backdrop blur effect */}
                  <img
                    src={book.coverImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110"
                  />

                  {/* Main Cover - Complete view without crop */}
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
                    {book.mood && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                        <span className="font-semibold">Mood:</span> {book.mood}
                      </p>
                    )}
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

                    {/* View Details Button */}
                    <button
                      onClick={() => navigate(`/book/${book._id}`)}
                      className="mt-3 sm:mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer"
                    >
                      View Details
                    </button>

                    {/* Edit & Delete Action Buttons */}
                    <div className="flex gap-2.5 mt-2.5">
                      <button
                        onClick={() => navigate(`/edit-book/${book._id}`)}
                        className="flex-1 flex justify-center items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="flex-1 flex justify-center items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer"
                      >
                        <FaTrash />
                        Delete
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