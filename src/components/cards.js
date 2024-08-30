import React from "react";
import "../styles/cards.css";

function BookCards() {
  return (
    <section className="book-cards">
      <div className="card-container">
        <div className="card">
          <div className="card-title">Best Author Books</div>
          <div className="card-image">
            <img src="/images/bestauth.png" alt="Book 1" />
          </div>
        </div>
        <div className="card">
          <div className="card-title">List of Best Fiction Books</div>
          <div className="card-image">
            <img src="/images/bestfict.png" alt="Book 2" />
          </div>
        </div>
        <div className="card">
          <div className="card-title">Amazon Bestsellers Books</div>
          <div className="card-image">
            <img src="/images/besttrph.png" alt="Book 3" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookCards;
