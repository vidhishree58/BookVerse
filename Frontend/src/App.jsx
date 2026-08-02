import { Routes, Route } from "react-router-dom";
import axios from "axios";

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/mood-hub" element={<MoodHub />} />
      <Route path="/top-rated" element={<TopRated />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/my-books" element={<BooksAdded />} />
      <Route path="/my-comments" element={<MyComments />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
    </Routes>
  );
}

export default App;