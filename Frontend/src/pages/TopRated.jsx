import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import BookCard from "../components/BookCard";
import API from "../Api";

const TopRated = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTopRatedBooks = async () => {
    try {
      setLoading(true);

      const response = await API.get("/books", {
        params: {
          sort: "rating",
        },
      });

      setBooks(response.data.books);
    } catch (error) {
      console.log("Top Rated Books Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopRatedBooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c16]">
      <DashboardNavbar />

      <main className="px-6 md:px-10 py-10">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Top Rated ⭐
          </h1>

          <p className="text-gray-200 mt-2 text-base md:text-lg">
            Discover the highest-rated books loved by readers.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-200 text-lg">
              Loading top rated books...
            </p>
          </div>
        )}

        {/* Books */}
        {!loading && (
          <>
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {books.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  No rated books available yet.
                </p>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default TopRated;