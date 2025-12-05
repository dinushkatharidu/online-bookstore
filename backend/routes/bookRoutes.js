const express = require("express");
const {
  getAllBooks,
  getMyBooks,
  createBook,
  updateMyBook,
  deleteMyBook,
} = require("../controllers/bookController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC – list all books
router.get("/", getAllBooks);

// Below routes require login + seller role
router.use(protect);
router.get("/my", restrictTo("seller"), getMyBooks);
router.post("/", restrictTo("seller"), createBook);
router.patch("/:id", restrictTo("seller"), updateMyBook);
router.delete("/:id", restrictTo("seller"), deleteMyBook);

module.exports = router;
