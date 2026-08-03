import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../Api";
import toast from "react-hot-toast";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    mood: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const getBook = async () => {
    try {
      const response = await API.get(`/books/${id}`);

      setBook({
        title: response.data.book.title,
        author: response.data.book.author,
        genre: response.data.book.genre,
        mood: response.data.book.mood,
        description: response.data.book.description,
      });
    } catch (error) {
      console.log(error);
      toast.success(error.response?.data?.message || "Failed to load book");
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await API.put(
        `/books/${id}`,
        book,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(response.data.message);

      navigate("/my-books");
    } catch (error) {
      success(
        error.response?.data?.message ||
          "Failed to update book"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#120812] flex justify-center items-center py-10 px-5">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1b0d1b] border border-[#7808be] rounded-2xl w-full max-w-3xl p-8 shadow-2xl space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          Edit Book
        </h1>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#2a172a] border border-[#7808be]/40 text-white outline-none focus:border-[#7808be]"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#2a172a] border border-[#7808be]/40 text-white outline-none focus:border-[#7808be]"
        />

        <select
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#2a172a] border border-[#7808be]/40 text-white outline-none focus:border-[#7808be]"
        >
          <option value="">Select Genre</option>
          <option>Fantasy</option>
          <option>Romance</option>
          <option>Thriller</option>
          <option>Mystery</option>
          <option>Horror</option>
          <option>Science Fiction</option>
          <option>Historical Fiction</option>
          <option>Adventure</option>
          <option>Crime</option>
          <option>Supernatural</option>
          <option>Self Help</option>
          <option>Biography & Memoir</option>
          <option>Philosophy</option>
          <option>Psychology</option>
          <option>Business & Economics</option>
          <option>Poetry</option>
          <option>Classic</option>
          <option>Young Adult</option>
        </select>

        <select
          name="mood"
          value={book.mood}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#2a172a] border border-[#7808be]/40 text-white outline-none focus:border-[#7808be]"
        >
          <option value="">Select Mood</option>
          <option>Happy & Uplifting</option>
          <option>Sad & Tearjerker</option>
          <option>Motivational & Inspiring</option>
          <option>Dark & Gritty</option>
          <option>Emotional & Heartfelt</option>
          <option>Relaxing & Cozy</option>
          <option>Funny & Humorous</option>
          <option>Suspenseful & Thrilling</option>
          <option>Mysterious & Intrigued</option>
          <option>Adventurous & Exciting</option>
          <option>Romantic & Dreamy</option>
          <option>Nostalgic</option>
        </select>

        <textarea
          name="description"
          placeholder="Book Description"
          rows="5"
          value={book.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#2a172a] border border-[#7808be]/40 text-white outline-none focus:border-[#7808be]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7808be] hover:bg-[#9427d6] transition rounded-lg py-3 text-white font-bold cursor-pointer disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Book"}
        </button>

      </form>
    </div>
  );
};

export default EditBook;