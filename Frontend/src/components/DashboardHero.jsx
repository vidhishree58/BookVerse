import { useEffect, useState } from "react";
import API from "../Api";
import BookCard from "./BookCard";

const DashboardHero = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user details
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};

  const fetchBooks = async () => {
    try {
      const response = await API.get("/books");

      if (response.data.success) {
        setBooks(response.data.books);
      }
    } catch (error) {
      console.log("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      {/*Mobile Optimized Welcome Section */}
      <div className="mb-6 md:mb-10 text-center md:px-10 ">
        {/* Mobile: text-2xl | Tablet: text-3xl | Desktop: text-4xl */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          Welcome Back,{" "}
          <span className="text-[#7808be]">
            {user.username || "Reader"}
          </span>{" "}
          👋
        </h1>

        {/* Mobile: text-sm | Desktop: text-lg */}
        <p className="text-white mt-2 text-sm sm:text-base md:text-lg max-w-lg mx-auto px-2">
          Discover amazing books shared by the community.
        </p>
      </div>

      {/* Books Grid with Balanced Mobile Spacing */}
      {loading ? (
        <div className="text-center py-10">
          <h2 className="text-gray-300 text-lg sm:text-xl font-medium animate-pulse">
            Loading Books...
          </h2>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-gray-400 text-base sm:text-xl">
            No books available right now.
          </h2>
        </div>
      ) : (
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </>
  );
};

export default DashboardHero;