import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
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

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#0b0c16] flex items-center md:items-start justify-center px-5 pt-10 md:pt-18 pb-10">
        <div className="w-full max-w-md bg-[#141726] border border-[#2b2f45] rounded-2xl shadow-2xl p-8">

          <h1 className="text-3xl font-bold text-center text-white">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-center mt-3 mb-8 leading-7">
            Sign in to{" "}
            <span className="text-[#6C47FF] font-semibold">
              BookVerse
            </span>{" "}
            and continue your reading journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-gray-300 block mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-[#1b2032] border border-[#2d3248] rounded-lg px-4 py-3 text-white outline-none focus:border-[#6C47FF]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 block mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-[#1b2032] border border-[#2d3248] rounded-lg px-4 py-3 text-white outline-none focus:border-[#6C47FF]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#6C47FF] hover:bg-[#5935ea] transition py-3 rounded-lg font-semibold text-white shadow-lg shadow-[#6C47FF]/20"
              >
                Login
              </button>
            </div>

          </form>

          <p className="text-center text-gray-400 mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#8f73ff] hover:underline font-medium"
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