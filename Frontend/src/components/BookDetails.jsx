import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import DashboardNavbar from "./DashboardNavbar";
import toast from "react-hot-toast";
import API from "../Api";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Get Book Details + All Reviews
  const getBookDetails = async () => {
    try {
      const response = await API.get(`/books/${id}`);

      setBook(response.data.book);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log("Book Details Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookDetails();
  }, [id]);

  // Add Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.success("Please select a rating");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await API.post(
        "/reviews/add",
        {
          bookId: id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      toast.success(response.data.message);

      // Clear Form
      setRating(0);
      setComment("");

      // Get updated rating + reviews by calling getBookDetails
      await getBookDetails();
    } catch (error) {
      toast.success(
        error.response?.data?.message ||
          "Something went wrong while adding review",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c16]">
        <DashboardNavbar />

        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400 text-xl">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0b0c16]">
        <DashboardNavbar />

        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400 text-xl">Book not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c16]">
      <DashboardNavbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* ================= BOOK DETAILS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 bg-[#14121d] border border-[#7808be]/40 rounded-2xl p-6 md:p-8">
          {/* Book Cover */}
          <div className="flex justify-center">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full max-w-70 h-100 object-cover rounded-xl shadow-xl"
            />
          </div>

          {/* Book Information */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {book.title}
            </h1>

            <p className="text-white text-lg mt-2">by {book.author}</p>

            <p className="text-purple-400 mt-2">
              Added by{" "}
              <span className="text-purple-400 font-medium">
                {book.addedBy?.username}
              </span>
            </p>

            {/* Genre + Mood */}
            <div className="flex flex-wrap gap-3 mt-5">
              <span className="bg-[#7808be]/20 border border-[#7808be]/50 text-white px-4 py-2 rounded-full">
                📚 {book.genre}
              </span>

              <span className="bg-[#7808be]/20 border border-[#7808be]/50 text-white px-4 py-2 rounded-full">
                😊 {book.mood}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-6">
              <FaStar className="text-yellow-400 text-2xl" />

              <span className="text-white text-xl font-bold">
                {book.averageRating}
              </span>

              <span className="text-gray-400">
                ({book.totalRatings}{" "}
                {book.totalRatings === 1 ? "Rating" : "Ratings"})
              </span>
            </div>

            {/* Description */}
            <div className="mt-7">
              <h2 className="text-xl font-semibold text-white mb-2">
                About this book
              </h2>

              <p className="text-gray-300 leading-7">{book.description}</p>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS ================= */}

        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Reader Reviews 💬
          </h2>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-[#14121d] border border-[#7808be]/30 rounded-xl p-5"
                >
                  {/* Username + Rating */}
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <h3 className="text-white font-semibold text-lg">
                      {review.username}
                    </h3>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={
                            star <= review.rating
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <p className="text-gray-300 mt-3 leading-6">
                      {review.comment}
                    </p>
                  )}

                  {/* Date */}
                  <p className="text-gray-500 text-sm mt-3">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No reviews yet.</p>
          )}
        </section>

        {/* ================= ADD REVIEW ================= */}

        <section className="mt-12 mb-10">
          <div className="bg-[#14121d] border border-[#7808be]/40 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white">Add Your Review</h2>

            <p className="text-gray-400 mt-2">
              Share your thoughts about this book with other readers.
            </p>

            <form onSubmit={handleReviewSubmit} className="mt-6">
              {/* Star Rating */}
              <div>
                <label className="text-gray-300 block mb-3">Your Rating</label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-3xl cursor-pointer transition hover:scale-110"
                    >
                      <FaStar
                        className={
                          star <= rating ? "text-yellow-400" : "text-gray-600"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="mt-6">
                <label className="text-gray-300 block mb-2">Your Comment</label>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you think about this book?"
                  rows="4"
                  className="w-full bg-[#211521] border border-[#7808be]/40 rounded-lg px-4 py-3 text-white outline-none focus:border-[#7808be] resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-5 bg-[#7808be] hover:bg-[#9427d6] disabled:opacity-60 transition px-7 py-3 rounded-lg text-white font-semibold cursor-pointer"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BookDetails;
