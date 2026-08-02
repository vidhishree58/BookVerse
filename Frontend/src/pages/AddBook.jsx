import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import API from "../Api";

const AddBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    mood: "",
    description: "",
    rating: "",
    comment: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    const fileInput = document.getElementById("book-cover-input");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("genre", book.genre);
      formData.append("mood", book.mood);
      formData.append("description", book.description);
      formData.append("rating", book.rating);
      formData.append("comment", book.comment);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const token = localStorage.getItem("token");

      const response = await API.post("/books/add", formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
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
          Add New Book
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

        {/* Expanded Genres List */}
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

        {/* Expanded Moods List */}
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

        <input
          type="number"
          min="1"
          max="5"
          name="rating"
          placeholder="Your Rating (1-5)"
          value={book.rating}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#2a172a] border border-[#7808be]/40 text-white outline-none focus:border-[#7808be]"
        />

        <textarea
          name="comment"
          placeholder="Your Review (Optional)"
          rows="3"
          value={book.comment}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#2a172a] border border-[#7808be]/40 text-white outline-none focus:border-[#7808be]"
        />

        <div className="relative flex items-center justify-between w-full p-3 rounded-lg bg-[#2a172a] border border-[#7808be]/40 text-white">
          <input
            id="book-cover-input"
            type="file"
            placeholder="Optional"
            accept="image/*"
            onChange={handleImage}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#7808be] file:text-white hover:file:bg-[#9427d6] file:cursor-pointer cursor-pointer outline-none"
          />

          {coverImage && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-4 text-gray-400 hover:text-red-400 transition text-lg"
              title="Remove image"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400 italic">
          Cover image is optional • JPG, PNG, WEBP • Maximum file size: 5 MB
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7808be] hover:bg-[#9427d6] transition rounded-lg py-3 text-white font-bold cursor-pointer"
        >
          {loading ? "Publishing..." : "Publish Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
