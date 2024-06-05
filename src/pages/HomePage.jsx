// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import BookSearch from "../components/BookSearch";
import { Link } from "react-router-dom";
import styles from "../style/HomePage.module.scss";

const HomePage = () => {
  const [bookshelf, setBookshelf] = useState(() => {
    const savedBooks = localStorage.getItem("bookshelf");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }, [bookshelf]);

  const addToBookshelf = (book) => {
    if (!bookshelf.find((b) => b.key === book.key)) {
      setBookshelf([...bookshelf, book]);
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.nav}>
        <h2 className={styles.title}>BookStore</h2>
        <Link to="/bookshelf">
          <button className={styles.bookshelfButton}>My Bookshelf</button>
        </Link>
      </div>
      <div className={styles.s}><h3>Search by book name:</h3></div>

      <BookSearch addToBookshelf={addToBookshelf} />
    </div>
  );
};

export default HomePage;
