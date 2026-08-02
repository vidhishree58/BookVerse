import Navbar from "../components/Navbar";
import {
  FaBook,
  FaHeart,
  FaStar,
  FaComments,
  FaUserFriends,
  FaBookOpen,
} from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-[#0b0c16] text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center">
          About <span className="text-[#7808be]">BookVerse</span>
        </h1>

        <p className="text-gray-200 text-center mt-6 text-lg leading-8 max-w-4xl mx-auto">
          <span className="font-semibold text-white">BookVerse</span> is a
          community-driven platform where readers can discover books,
          share their favorite reads, and help others find the perfect book.
          Instead of endless searching, users can explore books through
          genres, moods, and reader ratings while contributing honest reviews
          from their own reading experience.
        </p>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What You Can Do
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-[#161625] border border-[#7808be]/40 rounded-xl p-6">
              <FaBook className="text-4xl text-[#18e82d]" />
              <h3 className="text-2xl font-semibold mt-4">
                Add Books
              </h3>
              <p className="text-gray-200 mt-3 leading-7">
                Share your favorite books by adding their title, author,
                genre, mood, description, cover image, and your first review.
              </p>
            </div>

            <div className="bg-[#161625] border border-[#7808be]/40 rounded-xl p-6">
              <FaBookOpen className="text-4xl text-[#399dea]" />
              <h3 className="text-2xl font-semibold mt-4">
                Discover Books
              </h3>
              <p className="text-gray-200 mt-3 leading-7">
                Browse books shared by the community and discover your next
                read through beautifully organized book collections.
              </p>
            </div>

            <div className="bg-[#161625] border border-[#7808be]/40 rounded-xl p-6">
              <FaHeart className="text-4xl text-[#be0808]" />
              <h3 className="text-2xl font-semibold mt-4">
                Mood Hub
              </h3>
              <p className="text-gray-200 mt-3 leading-7">
                Looking for a happy, emotional, romantic, or thrilling read?
                Choose your current mood and instantly discover books that
                perfectly match it.
              </p>
            </div>

            <div className="bg-[#161625] border border-[#7808be]/40 rounded-xl p-6">
              <FaStar className="text-4xl text-[#e3f30a]" />
              <h3 className="text-2xl font-semibold mt-4">
                Reader Ratings
              </h3>
              <p className="text-gray-200 mt-3 leading-7">
                Every book displays an average rating based on community
                reviews, helping readers identify the most loved books.
              </p>
            </div>

            <div className="bg-[#161625] border border-[#7808be]/40 rounded-xl p-6">
              <FaComments className="text-4xl text-[#e942a9]" />
              <h3 className="text-2xl font-semibold mt-4">
                Reviews & Comments
              </h3>
              <p className="text-gray-200 mt-3 leading-7">
                Read genuine reviews from other readers and share your own
                opinions after finishing a book. Each user can review a book
                once, making feedback authentic and meaningful.
              </p>
            </div>

            <div className="bg-[#161625] border border-[#7808be]/40 rounded-xl p-6">
              <FaUserFriends className="text-4xl text-[#2308be]" />
              <h3 className="text-2xl font-semibold mt-4">
                Personal Library
              </h3>
              <p className="text-gray-200 mt-3 leading-7">
                Manage the books you've added, edit their details whenever
                needed, delete outdated entries, and keep track of all your
                reviews from one place.
              </p>
            </div>

          </div>
        </div>

        {/* Why BookVerse */}
        <div className="mt-20 bg-[#161625] border border-[#7808be]/40 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Why BookVerse?
          </h2>

          <p className="text-gray-200 leading-8 text-lg">
            BookVerse was created to make book discovery simple, enjoyable,
            and community-driven. Rather than relying only on bestseller
            lists, readers can explore books based on real experiences,
            personal moods, genres, and honest recommendations shared by
            fellow book lovers.
          </p>

        </div>

      </div>
    </div>
  );
}

export default About;