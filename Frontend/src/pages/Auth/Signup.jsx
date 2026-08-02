import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
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
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await API.post("/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#0b0c16] flex items-center justify-center px-5 py-20">
        <div className="w-full max-w-md bg-[#141726] border border-[#2b2f45] rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-white">
            Create Your Account
          </h1>

          <p className="text-gray-400 text-center mt-3 mb-8 leading-7">
            Join <span className="text-[#6C47FF] font-semibold">BookVerse</span>{" "}
            and start building your personal reading journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-gray-300 block mb-2">Full Name</label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-[#1b2032] border border-[#2d3248] rounded-lg px-4 py-3 text-white outline-none focus:border-[#6C47FF]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 block mb-2">Email</label>

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
              <label className="text-gray-300 block mb-2">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div>
              <label className="text-gray-300 block mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full bg-[#1b2032] border border-[#2d3248] rounded-lg px-4 py-3 text-white outline-none focus:border-[#6C47FF]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6C47FF] hover:bg-[#5935ea] transition py-3 rounded-lg font-semibold text-white mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-400 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#8f73ff] hover:underline font-medium"
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
