// const puppeteer = require("puppeteer");

// async function scrapeReviews() {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.goto("https://www.indiamart.com/triveni-world/testimonial.html", { waitUntil: "networkidle2" });

//     for (let i = 0; i < 3; i++) {
//         const loadMoreButton = await page.$("#rat_more");
//         if (!loadMoreButton) break;
//         await loadMoreButton.click();
//     }

//     const reviews = await page.evaluate(() => {
//         const reviewElements = document.querySelectorAll(".FM_rvwC.FM_w3");
//         let reviewData = [];

//         reviewElements.forEach(review => {
//             let name = review.querySelector(".FM_f17.FM_bo.FM_c2.FM_mb10.FM_ds5.FM_ds7 span:first-child")?.innerText.trim() || "N/A";
//             let location = review.querySelector(".FM_f17.FM_bo.FM_c2.FM_mb10.FM_ds5.FM_ds7 span:nth-child(3)")?.innerText.trim() || "N/A";
//             let date = review.querySelector(".FM_f16.FM_c7.FM_mb15 span:first-child")?.innerText.trim() || "N/A";
//             let product = review.querySelector(".FM_f16.FM_c7.FM_mb15 span:nth-child(3)")?.innerText.replace("Product Name : ", "").trim() || "N/A";
//             let reviewText = review.querySelector(".FM_m15.FM_C0.FM_f16.FM_mtn25.FM_wrd")?.innerText.trim() || "N/A";

//             let ratingElement = review.querySelector(".FM_flsRt.FM_pa");
//             let rating = ratingElement ? (parseInt(ratingElement.style.width) / 20) : "N/A";

//             reviewData.push({ name, location, date, product, rating, reviewText });
//         });

//         return reviewData;
//     });

//     await browser.close();
//     return reviews;
// }

// module.exports = scrapeReviews;


const puppeteer = require("puppeteer");

async function scrapeReviews(url) {
    if (!url) {
        throw new Error("URL is required");
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: "networkidle2" });

        for (let i = 0; i < 3; i++) {
            const loadMoreButton = await page.$("#rat_more");
            if (!loadMoreButton) break;
            await loadMoreButton.click();
        }

        const reviews = await page.evaluate(() => {
            const reviewElements = document.querySelectorAll(".FM_rvwC.FM_w3");
            let reviewData = [];

            reviewElements.forEach(review => {
                let name = review.querySelector(".FM_f17.FM_bo.FM_c2.FM_mb10.FM_ds5.FM_ds7 span:first-child")?.innerText.trim() || "N/A";
                let location = review.querySelector(".FM_f17.FM_bo.FM_c2.FM_mb10.FM_ds5.FM_ds7 span:nth-child(3)")?.innerText.trim() || "N/A";
                let date = review.querySelector(".FM_f16.FM_c7.FM_mb15 span:first-child")?.innerText.trim() || "N/A";
                let product = review.querySelector(".FM_f16.FM_c7.FM_mb15 span:nth-child(3)")?.innerText.replace("Product Name : ", "").trim() || "N/A";
                let reviewText = review.querySelector(".FM_m15.FM_C0.FM_f16.FM_mtn25.FM_wrd")?.innerText.trim() || "N/A";

                let ratingElement = review.querySelector(".FM_flsRt.FM_pa");
                let rating = ratingElement ? (parseInt(ratingElement.style.width) / 20) : "N/A";

                reviewData.push({ name, location, date, product, rating, reviewText });
            });

            return reviewData;
        });

        return reviews;
    } catch (error) {
        throw new Error("Error scraping the page: " + error.message);
    } finally {
        await browser.close();
    }
}

module.exports = scrapeReviews;
