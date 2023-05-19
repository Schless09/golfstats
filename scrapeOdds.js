// Import the required libraries
const axios = require('axios');
const cheerio = require('cheerio');

// Define the URL of the website to scrape
const url = 'https://il.sportsbook.fanduel.com/';

// Define the function to scrape the odds
async function scrapeOdds() {
  try {
    // Make an HTTP GET request to the website
    const response = await axios.get(url);

    // Load the HTML content of the website using cheerio
    const $ = cheerio.load(response.data);

    // Find the element containing the PGA Championship winner odds
    const oddsElement = $('.iu.iv.ba.ed.jc.jd.ez');

    // Extract the odds value from the element
    const odds = oddsElement.text();

    // Log the odds to the console
    console.log('PGA Championship Winner Odds:', odds);
  } catch (error) {
    console.error('Error scraping odds:', error.message);
  }
}

// Call the scrapeOdds function to initiate the scraping
scrapeOdds();

module.exports = scrapeOdds;
