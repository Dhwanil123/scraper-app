const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const reviewSchema = new mongoose.Schema({
    name: String,
    location: String,
    date: String,
    product: String,
    rating: Number,
    reviewText: String
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
