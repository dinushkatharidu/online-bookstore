const Book = require("../models/Book");

// PUBLIC: Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// SELLER: Get my books
exports.getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// SELLER: Create book
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, price, category, condition, imageUrl } =
      req.body;

    if (!title || !author || !price) {
      return res.status(400).json({
        success: false,
        message: "Title, author and price are required",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      price,
      category,
      condition,
      imageUrl,
      seller: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// SELLER: Update my book
exports.updateMyBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findOneAndUpdate(
      { _id: bookId, seller: req.user._id }, // ensure owner
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found or you do not own this book",
      });
    }

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// SELLER: Delete my book
exports.deleteMyBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findOneAndDelete({
      _id: bookId,
      seller: req.user._id,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found or you do not own this book",
      });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
