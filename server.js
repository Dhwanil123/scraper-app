const express = require("express");
const Review = require("./db");  
const scrapeReviews = require("./indiamart_scrapper/reviewScraper");

const app = express();
app.use(express.json());

app.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Error fetching reviews" });
    }
});

// Route to scrape and store reviews
// app.get("/scrape", async (req, res) => {
//     try {
//         const reviews = await scrapeReviews();
//         await Review.insertMany(reviews);
//         res.json({ message: "Scraping and storing completed", data: reviews });
//     } catch (error) {
//         res.status(500).json({ error: "Error scraping data" });
//     }
// });


// app.get("/scrape", async (req, res) => {
//     console.log("Scrape API called"); // Debugging
//     try {
//         const reviews = await scrapeReviews();
//         console.log("Scraped data:", reviews); // Debugging
//         await Review.insertMany(reviews);
//         res.json({ message: "Scraping and storing completed", data: reviews });
//     } catch (error) {
//         console.error("Scraping Error:", error);
//         res.status(500).json({ error: "Error scraping data" });
//     }
// });


// app.post("/scrape", async (req, res) => {
//     const { url } = req.body; 

//     if (!url || !url.startsWith("https://www.indiamart.com/")) {
//         return res.status(400).json({ error: "Invalid or missing URL. Please provide a valid IndiaMART URL." });
//     }

//     try {
//         console.log(`Scraping URL: ${url}`);
//         const reviews = await scrapeReviews(url);
//         await Review.insertMany(reviews);
//         res.json({ message: "Scraping and storing completed", data: reviews });
//     } catch (error) {
//         console.error("Scraping Error:", error);
//         res.status(500).json({ error: "Error scraping data" });
//     }
// });


app.post("/scrape", async (req, res) => {
    const { url } = req.body;

    if (!url || !url.startsWith("https://www.indiamart.com/")) {
        return res.status(400).json({ error: "Invalid or missing URL. Please provide a valid IndiaMART URL." });
    }

    try {
        console.log(`Scraping URL: ${url}`);
        
        // Log before calling scrapeReviews
        console.log('Starting the review scraping process...');
        
        const reviews = await scrapeReviews(url);
        
        // Log after getting the reviews
        console.log(`Scraped reviews: ${JSON.stringify(reviews)}`);

        await Review.insertMany(reviews);
        res.json({ message: "Scraping and storing completed", data: reviews });
    } catch (error) {
        console.error("Scraping Error:", error);
        res.status(500).json({ error: "Error scraping data", details: error.message });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
