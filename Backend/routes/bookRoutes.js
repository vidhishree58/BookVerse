const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {addBook,getAllBooks,getBookById,updateBook,deleteBook,} = require("../controllers/bookController");

// Public Routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Protected Routes
router.post("/add", auth, upload.single("coverImage"), addBook);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);

module.exports = router;