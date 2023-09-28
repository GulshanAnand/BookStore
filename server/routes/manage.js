const express = require("express");
const path = require("path");
const generateString = require("../utils/randomString.js");
const BookModel = require("../models/Book");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'images')); // Destination directory
  },
  filename: (req, file, cb) => {
    // Use the current timestamp as a unique filename
    cb(null, Date.now() + generateString() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!!!");
});

router.post("/addbook", upload.single("image"), async (req, res) => {
  const { title, author, publisher, mrp, price, quantity } = req.body;
  const imagename = req.file.filename;
  const book = await BookModel.findOne({ title });

  if (book) {
    return res.json({ message: "Book already exists" });
  }

  const newBook = new BookModel({
    title,
    author,
    publisher,
    mrp,
    price,
    quantity,
    imagename,
  });
  try {
    await newBook.save();
    return res.status(200).json({ status: 100, message: "Book added successfully" });
  } catch (err) {
    return res.json({ message: "Something went wrong" });
  }
});

router.post("/toggle", async (req, res) => {
  const { _id } = req.body;
  const book = await BookModel.findOne({_id});
  if (!book) {
    throw new Error("Book not found");
  }
  book.available = (!(book.available));
  await book.save();
  return res.status(200).json({ status: 100, message: "Availability Uddated" });
});

router.get("/listallbooks", async (req, res) => {
  try {
    const books = await BookModel.find({});
    // console.log(books);
    res.json(books);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for books." });
  }
});

module.exports = router;
