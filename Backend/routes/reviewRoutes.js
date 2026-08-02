const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { addReview } = require("../controllers/reviewController");

router.post("/add", auth, addReview);

module.exports = router;