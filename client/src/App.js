import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  const [ quotes, setQuotes ] = useState([]);
  const [ quotesByAuthor, setQuotesByAuthor ] = useState([]);
  const [ author, setAuthor ] = useState("");
  useEffect(() => {
    axios
      .get('https://quote-garden.herokuapp.com/api/v3/quotes/random')
      .then(res => {
        // console.log(res.data.data) //quoteText, quoteAuthor, QuoteGenre
        setQuotes(res.data.data)
        setQuotesByAuthor([]);
        setAuthor("");
      })
  }, [])

  const handleClick = () => {
    axios
      .get('https://quote-garden.herokuapp.com/api/v3/quotes/random')
      .then(res => {
        // console.log(res.data.data) //quoteText, quoteAuthor, QuoteGenre
        setQuotes(res.data.data)
        setQuotesByAuthor([]);
        setAuthor("");
      })
  }

  const getQuotesByAuthor = (authorName) => {
    setQuotes([]);
    // https://quote-garden.herokuapp.com/api/v2/authors/Fyodor%20Dostoevsky?page=1&limit=10
    const author = authorName.replace(/ /g, "+")// "Bill Gates" >> "Bill+Gates"
    setAuthor(authorName);
    axios
      .get(`https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`)
      .then(res => {
        setQuotesByAuthor(res.data.data);
      })
  }

  return (
    <div className="App">
      <div>
        <p className="random" onClick={handleClick}>random <span>🔄</span></p>
      </div>
      {quotes && quotes.map(i =>
        <div key={i["_id"]}>
          <p className="quote">"{i["quoteText"]}"</p>
          <div className="author-hover-box" onClick={() => getQuotesByAuthor(i["quoteAuthor"])}>
            <div>
              <p className="author">{i["quoteAuthor"]}</p>
              <p className="genre">{i["quoteGenre"]}</p>
            </div>
            <span className="click-emoji">➡️</span>
          </div>
        </div>)}
      {quotesByAuthor && <p className="author-name">{author}</p> }
      {quotesByAuthor && quotesByAuthor.map(i =>
        <div key={i["_id"]}>
          <p className="quote">"{i["quoteText"]}"</p>
        </div>
      )}
      <footer>
        created by Areum Jo  |  devCallenges.io
      </footer>
    </div>
  );
}


export default App;
