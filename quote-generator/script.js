const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const facebookBtn = document.getElementById("facebook");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// create the function to show new quote
function newQuote() {
  // using Math.floor function
  // To pick a random quote from quote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //if the author empty or null we wanted to display as unknown
  //first check if the author is null or empty
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // console.log("it's a quote",quote);
  // set the value of the text content
  //check the quote length to adjust the styling (if the text is very long we wanted to display as the long text class)
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
}

// Get Quote from API
// another option for API  https://zenquotes.io/
async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here
  }
}

// twitter button
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}
  `;
  window.open(twitterUrl, "_blank");
}

// facebook share button
function shareQuote() {
  const facebookUrl = `https://www.facebook.com/dialog/share&app_id=145634995501895&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer?text=${quoteText.textContent} - ${authorText.textContent}
  `;
  window.open(facebookUrl, "_blank");
}

// add event listeners here
newQuoteBtn.addEventListener("click", newQuote);
facebookBtn.addEventListener("click", shareQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
