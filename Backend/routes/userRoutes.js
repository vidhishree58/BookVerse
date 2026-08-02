const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getMyBooks, getMyComments } = require("../controllers/userController");

router.get("/my-books", auth, getMyBooks);
router.get("/my-comments", auth, getMyComments);

module.exports = router;