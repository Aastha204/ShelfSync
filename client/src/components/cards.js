import React from "react";
import "../styles/cards.css";

function BookCards() {
  return (
    <section className="book-cards">
      <div className="card1-container">
        <a href="#bestauthor" className="card1">
          <div className="card1-title">Best Author Books</div>
          <div className="card1-image">
            <img src="/images/bestauth.png" alt="Book 1" />
          </div>
        </a>
        <a href="#bestfiction" className="card1">
          <div className="card1-title">List of Best Fiction Books</div>
          <div className="card1-image">
            <img src="/images/bestfict.png" alt="Book 2" />
          </div>
        </a>
        <a href="#amazonseller" className="card1">
          <div className="card1-title">Amazon Bestsellers Books</div>
          <div className="card1-image">
            <img src="/images/besttrph.png" alt="Book 3" />
          </div>
        </a>
      </div>
    </section>
  );
}

export default BookCards;
