import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import BookCard from "../components/BookCard";
import API from "../Api";

const MoodHub = () => {
  const moods = [
    "Happy & Uplifting",
    "Sad & Tearjerker",
    "Motivational & Inspiring",
    "Dark & Gritty",
    "Emotional & Heartfelt",
    "Relaxing & Cozy",
    "Funny & Humorous",
    "Suspenseful & Thrilling",
    "Mysterious & Intrigued",
    "Adventurous & Exciting",
    "Romantic & Dreamy",
    "Nostalgic",
  ];

  const [selectedMood, setSelectedMood] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBooksByMood = async (mood) => {
    try {
      setLoading(true);

      const response = await API.get("/books", {
        params: {
          mood: mood,
        },
      });

      setBooks(response.data.books);
    } catch (error) {
      console.log("Mood Books Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    getBooksByMood(mood);
  };

  return (
    <div className="min-h-screen bg-[#0b0c16]">
      <DashboardNavbar />

      <main className="px-6 md:px-10 py-10">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Mood Hub 😊
          </h1>

          <p className="text-gray-200 mt-2 text-base md:text-lg">
            Choose a mood and discover books that match how you feel.
          </p>
        </div>

        {/* Mood Buttons Container (Mobile Swipe Bar | Desktop Wrap Grid) */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-3 mb-8 sm:flex-wrap">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => handleMoodClick(mood)}
              className={`min-w-25 px-5 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap cursor-pointer transition shrink-0 text-center ${
                selectedMood === mood
                  ? "bg-[#7808be] border-[#7808be] text-white shadow-lg shadow-[#7808be]/40"
                  : "bg-[#160b16] border-[#7808be]/40 text-gray-300 hover:border-[#7808be]"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Before Selecting Mood */}
        {!selectedMood && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Select a mood to explore books.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Loading books...</p>
          </div>
        )}

        {/* Selected Mood Books */}
        {!loading && selectedMood && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedMood} Books
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
                  No books available for {selectedMood}.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MoodHub;