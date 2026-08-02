const Book = require("../models/Book");
const Review = require("../models/Review");

const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ addedBy: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyComments = async (req, res) => {
  try {
    const comments = await Review.find({ userId: req.user.id })
      .populate("bookId", "title author")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyBooks,
  getMyComments,
};