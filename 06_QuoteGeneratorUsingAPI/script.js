/* Element selection from dom */
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const authorName = document.getElementById("authorName");
const anotherQuote = document.getElementById("new-quote");
const tweetButton = document.getElementById("twitter-button");
const loader = document.getElementById("loader-animation");

// to store data locally retrieved by api
let apiQuotes = [];

/* Show loader */
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide loader
function complete() {
  setTimeout(() => {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }, 800);
}

/* get quotes using api */
async function getQuotes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("Error fetched: ", error);
    complete();
  }
}
getQuotes();

/* New Quote */
function newQuote() {
  loading();
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (randomQuote.text.length > 150) {
    quoteText.classList.add("long-text");
  } else {
    quoteText.classList.remove("long-text");
  }
  quoteText.textContent = randomQuote.text;

  if (!randomQuote.author) {
    authorName.textContent = "Unknown";
  } else {
    authorName.textContent = randomQuote.author;
  }
  complete();
}

/* New quote buttton */
anotherQuote.addEventListener("click", newQuote);

/* Tweet quote */
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorName.textContent}`;
  window.open(twitterURL, "_blank");
}
/* Tweet button */
tweetButton.addEventListener("click", tweetQuote);
