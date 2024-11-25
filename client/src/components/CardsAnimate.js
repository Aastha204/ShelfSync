import React, { useState, useEffect } from "react";
import "../styles/CardsAnimate.css";
import { useNavigate } from "react-router-dom";

const CardsAnimate = () => {
  const [position, setPosition] = useState(1);
  const navigate = useNavigate();
  const handleIssue = () => {
    navigate("/books");
  };
  const books = [
    // {
    //     image: "https://marketplace.canva.com/EAFf0E5urqk/1/0/1003w/canva-blue-and-green-surreal-fiction-book-cover-53S3IzrNxvY.jpg",
    //     title: "Surreal Fiction",
    //     author: "John Doe",
    //   },
      {
        image: "https://marketplace.canva.com/EAFwJNp8JNU/1/0/1003w/canva-purple-and-green-romance-novel-book-cover-uxus8p_qP8o.jpg",
        title: "Purple Romance",
        author: "Jane Smith",
      },
      {
        image: "https://atmospherepress.com/wp-content/uploads/2023/09/Garg-2-Cover-Project-front-jpg-672x1024.webp",
        title: "Garg's Journey",
        author: "Ankit Garg",
      },
      // {
      //   image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/book-cover-design-template-c53c1125486782d8f6927ffcba9811c4_screen.jpg?ts=1637036672",
      //   title: "Creative Covers",
      //   author: "Alex Roe",
      // },
      {
        image: "https://www.adazing.com/wp-content/uploads/2022/12/Harry-Potter-Book-Covers-Prisoner-of-Azkaban-15.jpg",
        title: "Harry Potter: Prisoner of Azkaban",
        author: "J.K. Rowling",
      },
      {
        image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1698210220",
        title: "Night Time Fiction",
        author: "Alice Brown",
      },
      {
        image: "https://blog-cdn.reedsy.com/directories/gallery/237/large_99efb4a0449f950cda20ec5bddc93267.jpg",
        title: "Bound by Mystery",
        author: "Chris Evans",
      },
      // {
      //   image: "https://images.squarespace-cdn.com/content/v1/5d603ac3c0d1340001ba9dad/1722197998145-2BKUA84NTVJBK2SMO2UV/image-asset.octet-stream?format=500w",
      //   title: "Enchanted Journeys",
      //   author: "Emily Stone",
      // },
      {
        image: "https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium",
        title: "Lost in the Unknown",
        author: "Liam Carter",
      },
      // {
      //   image: "https://marketplace.canva.com/EAEw1ooWHhA/1/0/1003w/canva-black-and-pink-romantic-floral-book-cover-2Zxee9M0kjQ.jpg",
      //   title: "Romantic Blossoms",
      //   author: "Sophia Jones",
      // },
      {
        image: "https://miblart.com/wp-content/uploads/2020/12/Un-cour-de-renards-scaled-1-683x1024.jpeg",
        title: "Foxes in the Wild",
        author: "David Clarke",
      },
      {
        image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/ship-wreck-novel-mystery-book-cover-template-design-fba9b2211375c3977269ef113fa7c139_screen.jpg?ts=1637025200",
        title: "Shipwreck Chronicles",
        author: "Rachel Moore",
      },
      {
        image: "https://hopewellslibraryoflife.wordpress.com/wp-content/uploads/2021/04/51uutyar4nl.jpg?w=333",
        title: "Timeless Love",
        author: "Michael Reed",
      },
      {
        image: "https://getcovers.com/wp-content/uploads/2020/12/image5.jpg",
        title: "Ethereal Dreams",
        author: "Natasha Bennett",
      },
      {
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2c7775148431747.62d5a7764af71.jpg",
        title: "Into the Mist",
        author: "James Taylor",
      },
      // {
      //   image: "https://booksicedlattesblessed.wordpress.com/wp-content/uploads/2020/05/whatifafish.jpg?w=684",
      //   title: "What If a Fish?",
      //   author: "Daniella Rivera",
      // },
  ];

  // Function to move to the next position
  const handleNext = () => {
    setPosition((prev) => (prev === books.length ? 1 : prev + 1));
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Move every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="carousel-container">
      <button className="arrow left-arrow" onClick={() => setPosition((prev) => (prev === 1 ? books.length : prev - 1))}>
        &#8249;
      </button>

      <main
        id="carousel"
        style={{
          "--position": position,
        }}
      >
        {books.map((book, index) => (
          <div
            className="item"
            key={index}
            style={{ "--offset": index + 1, backgroundImage: `url(${book.image})` }}
          >
            <div className="overlay">
              <div className="description">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                
              </div>
            </div>
          </div>
        ))}
      </main>

      <button className="arrow right-arrow" onClick={handleNext}>
        &#8250;
      </button>

      <div className="dots-container">
        {Array.from({ length: books.length }).map((_, index) => (
          <input
            type="radio"
            name="position"
            key={index + 1}
            checked={position === index + 1}
            onChange={() => setPosition(index + 1)}
          />
        ))}
      </div>
    </div>
    
    
  
  );
};

export default CardsAnimate;
