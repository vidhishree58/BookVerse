import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import API from "../../Api";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await API.post("/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success(response.data.message || "Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#120812] flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md bg-[#1b0d1b] border border-[#7808be]/30 rounded-2xl shadow-[0_10px_30px_rgba(120,8,190,0.25)] p-8">
          <h1 className="text-3xl font-bold text-center text-white">
            Create Your Account
          </h1>

          <p className="text-gray-400 text-center mt-3 mb-8 leading-7">
            Join <span className="text-[#a855f7] font-semibold">BookVerse</span>{" "}
            and start building your personal reading journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-gray-300 block mb-2 font-medium">Full Name</label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full bg-[#120812] border border-[#7808be]/40 rounded-lg px-4 py-3 text-white outline-none focus:border-[#7808be] focus:ring-1 focus:ring-[#7808be] transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 block mb-2 font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full bg-[#120812] border border-[#7808be]/40 rounded-lg px-4 py-3 text-white outline-none focus:border-[#7808be] focus:ring-1 focus:ring-[#7808be] transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 block mb-2 font-medium">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full bg-[#120812] border border-[#7808be]/40 rounded-lg px-4 py-3 text-white outline-none focus:border-[#7808be] focus:ring-1 focus:ring-[#7808be] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-[#a855f7] transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-300 block mb-2 font-medium">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  className="w-full bg-[#120812] border border-[#7808be]/40 rounded-lg px-4 py-3 text-white outline-none focus:border-[#7808be] focus:ring-1 focus:ring-[#7808be] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-[#a855f7] transition"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7808be] hover:bg-[#60069a] active:scale-[0.99] transition-all py-3 rounded-lg font-semibold text-white shadow-md mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-400 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#a855f7] hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signup;