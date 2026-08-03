import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import Genres from "./pages/Genres";
import MoodHub from "./pages/MoodHub";
import TopRated from "./pages/TopRated";
import BookDetails from "./components/BookDetails";
import BooksAdded from "./pages/BooksAdded";
import MyComments from "./pages/MyComments";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1b0d1b",
            color: "#ffffff",
            border: "1px solid #7808be",
            padding: "12px 16px",
            fontSize: "14px",
            boxShadow: "0 10px 25px -5px rgba(120, 8, 190, 0.3)",
          },
          success: {
            iconTheme: {
              primary: "#7808be",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <Routes>
        {/* Public Routes (General Access) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (Requires Login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/genres"
          element={
            <ProtectedRoute>
              <Genres />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mood-hub"
          element={
            <ProtectedRoute>
              <MoodHub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/top-rated"
          element={
            <ProtectedRoute>
              <TopRated />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-books"
          element={
            <ProtectedRoute>
              <BooksAdded />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-comments"
          element={
            <ProtectedRoute>
              <MyComments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            <ProtectedRoute>
              <EditBook />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;