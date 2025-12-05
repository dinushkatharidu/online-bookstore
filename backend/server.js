const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

// load environment variable
dotenv.config();

// Connect to database
connectDB();

// initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.json({
    messege: "Online Bookstore API is running!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      books: "api/books",
      cart: "api/cart",
      orders: "api/orders",
      users: "api/users",
    },
  });
});

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
