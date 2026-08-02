import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import API from "../Api";
import { FaStar } from "react-icons/fa";

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

      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyComments();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c16]">
      <DashboardNavbar />

      <main className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-white">
          💬 My Comments
        </h1>

        <p className="text-gray-200 mt-2">
          All the reviews you've shared with the BookVerse community.
        </p>

        {loading ? (
          <div className="text-center mt-20 text-gray-200">
            Loading...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center mt-20 text-gray-400 text-lg">
            You haven't reviewed any books yet.
          </div>
        ) : (
          <div className="space-y-6 mt-10">

            {comments.map((review) => (
              <div
                key={review._id}
                className="bg-[#14121d] border border-[#7808be]/40 rounded-2xl p-6"
              >
                {/* Book */}
                <h2 className="text-2xl font-bold text-white">
                  {review.bookId.title}
                </h2>

                {/*Author*/}
                <p className="text-gray-200 mt-1">
                  by {review.bookId.author}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-4">
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

                {/* Comment */}
                {review.comment && (
                  <p className="text-gray-300 mt-4 leading-7">
                    {review.comment}
                  </p>
                )}

                {/* Date */}
                <p className="text-gray-400 text-sm mt-4">
                  {new Date(review.createdAt).toLocaleDateString()}
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