const Review = require("../models/Review");
const Book = require("../models/Book");

const addReview = async (req, res) => {
  try {
    // Get data from request body
    const { bookId, rating, comment } = req.body;

    // Check if all required fields are provided
    if (!bookId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Book ID and Rating are required",
      });
    }

    // Check if book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user has already reviewed this book
    const existingReview = await Review.findOne({
      userId: req.user.id,
      bookId: bookId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this book",
      });
    }

    // Create review
    const review = await Review.create({
      userId: req.user.id,
      bookId,
      rating,
      comment,
    });

    // Get all reviews of this book
    const reviews = await Review.find({ bookId });

    // Calculate total ratings
    const totalRatings = reviews.length;

    // Calculate average rating
    const totalStars = reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0);

    const averageRating = Number((totalStars / totalRatings).toFixed(1));

    // Update book
    await Book.findByIdAndUpdate(bookId, {
      averageRating,
      totalRatings,
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
};
