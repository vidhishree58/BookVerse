import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import API from "../../Api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      // Save Token & User Details
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success(response.data.message || "Logged in successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#120812] flex items-center justify-center px-5 md:pt-4 pb-15">
        <div className="w-full max-w-md bg-[#1b0d1b] border border-[#7808be]/30 rounded-2xl shadow-[0_10px_30px_rgba(120,8,190,0.25)] p-8">
          <h1 className="text-3xl font-bold text-center text-white">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-center mt-3 mb-8 leading-7">
            Sign in to{" "}
            <span className="text-[#a855f7] font-semibold">BookVerse</span>{" "}
            and continue your reading journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-gray-300 block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-[#120812] border border-[#7808be]/40 rounded-lg px-4 py-3 text-white outline-none focus:border-[#7808be] focus:ring-1 focus:ring-[#7808be] transition placeholder:text-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 block mb-2 font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-[#120812] border border-[#7808be]/40 rounded-lg px-4 py-3 text-white outline-none focus:border-[#7808be] focus:ring-1 focus:ring-[#7808be] transition placeholder:text-gray-500 pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-[#a855f7] transition cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7808be] hover:bg-[#60069a] active:scale-[0.99] transition-all py-3 rounded-lg font-semibold text-white shadow-md mt-2 cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-400 mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#a855f7] hover:underline font-medium ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;