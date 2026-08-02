import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import BookCard from "../components/BookCard";
import API from "../Api";

const Genres = () => {
  const genres = [
    "Fantasy",
    "Romance",
    "Thriller",
    "Mystery",
    "Horror",
    "Science Fiction",
    "Historical Fiction",
    "Adventure",
    "Crime",
    "Supernatural",
    "Self Help",
    "Biography & Memoir",
    "Philosophy",
    "Psychology",
    "Business & Economics",
    "Poetry",
    "Classic",
    "Young Adult",
  ];

  const [selectedGenre, setSelectedGenre] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBooksByGenre = async (genre) => {
    try {
      setLoading(true);

      const response = await API.get("/books", {
        params: {
          genre: genre,
        },
      });

      setBooks(response.data.books);
    } catch (error) {
      console.log("Genre Books Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    getBooksByGenre(genre);
  };

  return (
    <div className="min-h-screen bg-[#0b0c16]">
      <DashboardNavbar />

      <main className="px-6 md:px-10 py-10">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Explore by Genre 📚
          </h1>

          <p className="text-gray-200 mt-2 text-base md:text-lg">
            Choose a genre and discover books that match your reading taste.
          </p>
        </div>

        {/* Genre Buttons */}
        {/* Mobile: Horizontal Swipe Bar | Laptop: Normal Wrap Grid */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-3 mb-8 sm:flex-wrap">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`min-w-25 px-5 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap cursor-pointer transition shrink-0 text-center ${
                selectedGenre === genre
                  ? "bg-[#7808be] border-[#7808be] text-white shadow-lg shadow-[#7808be]/40"
                  : "bg-[#160b16] border-[#7808be]/40 text-gray-300 hover:border-[#7808be]"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Before selecting genre */}
        {!selectedGenre && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Select a genre to explore books.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Loading books...</p>
          </div>
        )}

        {/* Books */}
        {!loading && selectedGenre && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedGenre} Books
            </h2>

            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  No books available in {selectedGenre}.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Genres;
