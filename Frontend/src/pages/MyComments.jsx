import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import API from "../Api";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyComments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/users/my-comments", {
        headers: {
          Authorization: token,
        },
      });

      // Handle both cases (response.data.comments or directly response.data)
      setComments(response.data.comments || response.data || []);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyComments();
  }, []);

  return (
    <div className="min-h-screen bg-[#120812]">
      <DashboardNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">
          💬 My Comments
        </h1>

        <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
          All the reviews you've shared with the{" "}
          <span className="text-[#a855f7] font-semibold">BookVerse</span> community.
        </p>

        {loading ? (
          <div className="text-center mt-20 text-gray-400 text-sm sm:text-base">
            Loading...
          </div>
        ) : !comments || comments.length === 0 ? (
          <div className="text-center mt-20 text-gray-400 text-lg">
            You haven't reviewed any books yet.
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 mt-8">
            {comments.map((review) => (
              <div
                key={review._id}
                className="bg-[#1b0d1b] border border-[#7808be]/30 rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(120,8,190,0.15)] hover:border-[#7808be]/60 transition duration-300"
              >
                {/* Book Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {review.bookId?.title || review.bookTitle || "Deleted Book"}
                </h2>

                {/* Author */}
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  by {review.bookId?.author || "Unknown Author"}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= (review.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-700"
                      }
                    />
                  ))}
                </div>

                {/* Comment Text */}
                {review.comment && (
                  <p className="text-gray-300 mt-3 text-sm sm:text-base leading-relaxed">
                    {review.comment}
                  </p>
                )}

                {/* Date */}
                <p className="text-gray-500 text-xs mt-3">
                  {review.createdAt 
                    ? new Date(review.createdAt).toLocaleDateString() 
                    : "Recently"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyComments;