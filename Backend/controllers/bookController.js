const Book = require("../models/Book");
const Review = require("../models/Review");
const uploadFile = require("../config/imagekit");

const addBook = async (req, res) => {
  try {
    // Get data from request body
    const { title, author, genre, mood, description, rating, comment } =
      req.body;

    // Get logged-in user id
    const addedBy = req.user.id;

    // Validate required fields
    if (
      !title ||
      !author ||
      !genre ||
      !mood ||
      !description ||
      rating === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if the book already exists
    const existingBook = await Book.findOne({
      title,
      author,
    });

    if (existingBook) {
      return res.status(409).json({
        success: false,
        message: "Book already exists",
      });
    }

    let coverImage = process.env.DEFAULT_BOOK_COVER;

    if (req.file) {
      const response = await uploadFile(req.file);
      coverImage = response.url;
    }

    // Create a new book
    const newBook = await Book.create({
      title,
      author,
      genre,
      mood,
      description,
      coverImage,
      addedBy,
      averageRating: rating,
      totalRatings: 1,
    });

    // Create the first review
    await Review.create({
      userId: addedBy,
      bookId: newBook._id,
      rating,
      comment,
    });

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    // Handle server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const { genre, mood, sort } = req.query;

    let filter = {};

    // Genre Filter
    if (genre) {
      filter.genre = genre;
    }

    // Mood Filter
    if (mood) {
      filter.mood = mood;
    }

    let books;

    // Top Rated
    if (sort === "rating") {
      books = await Book.find(filter).sort({
        averageRating: -1,
      });
    } else {
      // Latest Books
      books = await Book.find(filter).sort({
        createdAt: -1,
      });
    }

    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id)
      .populate("addedBy", "username");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const reviews = await Review.find({ bookId: id })
      .populate("userId", "username")
      .sort({ createdAt: -1 })
      .lean();

    const formattedReviews = reviews.map((review) => ({
      username: review.userId?.username || "Unknown User",
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    }));

    return res.status(200).json({
      success: true,
      book: {
        id: book._id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        mood: book.mood,
        description: book.description,
        coverImage: book.coverImage,

        addedBy: {
          id: book.addedBy?._id,
          username: book.addedBy?.username || "Unknown User",
        },

        averageRating: book.averageRating,
        totalRatings: book.totalRatings,
        createdAt: book.createdAt,
      },
      reviews: formattedReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    // Get book id
    const { id } = req.params;

    // Find book
    const book = await Book.findById(id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check ownership
    if (book.addedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this book",
      });
    }

    const { title, author, genre, mood, description, coverImage } = req.body;

    // Validate fields if provided
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty",
      });
    }

    if (author !== undefined && !author.trim()) {
      return res.status(400).json({
        success: false,
        message: "Author cannot be empty",
      });
    }

    if (genre !== undefined && !genre.trim()) {
      return res.status(400).json({
        success: false,
        message: "Genre cannot be empty",
      });
    }

    if (mood !== undefined && !mood.trim()) {
      return res.status(400).json({
        success: false,
        message: "Mood cannot be empty",
      });
    }

    if (description !== undefined && !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description cannot be empty",
      });
    }

    // Check duplicate book (ignore current book)
    if (title !== undefined || author !== undefined) {
      const existingBook = await Book.findOne({
        title: title ?? book.title,
        author: author ?? book.author,
        _id: { $ne: id },
      });

      if (existingBook) {
        return res.status(409).json({
          success: false,
          message: "Book already exists",
        });
      }
    }

    // Update fields
    if (title !== undefined) book.title = title.trim();
    if (author !== undefined) book.author = author.trim();
    if (genre !== undefined) book.genre = genre.trim();
    if (mood !== undefined) book.mood = mood.trim();
    if (description !== undefined) book.description = description.trim();

    if (coverImage !== undefined) book.coverImage = coverImage;

    // Save changes
    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    // Get book id
    const { id } = req.params;

    // Find book
    const book = await Book.findById(id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check ownership
    if (book.addedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this book",
      });
    }

    // Delete all reviews of this book
    await Review.deleteMany({
      bookId: id,
    });

    // Delete book
    await book.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };
