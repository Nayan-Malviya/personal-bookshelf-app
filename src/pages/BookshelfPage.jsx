// src/pages/BookshelfPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/BookshelfPage.module.scss';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState(() => {
    const savedBooks = localStorage.getItem('bookshelf');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const removeFromBookshelf = (book) => {
    const newBookshelf = bookshelf.filter(b => b.key !== book.key);
    setBookshelf(newBookshelf);
  };

  useEffect(() => {
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  }, [bookshelf]);

  return (
    <div className={styles.bookshelfPage}>
      <h2 className={styles.bookshelf}>My Bookshelf</h2>
      <div className={styles.bookList}>
        {bookshelf.map(book => (
          <div key={book.key} className={styles.bookCard}>
            <p className={styles.title}><strong>Book Title:</strong> {book.title}</p>
            {/* <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p> */}
            <p>
              <strong>
                Edition Count:
                <strong />
              </strong>{" "}
              {book.edition_count}
            </p>
            <button onClick={() => removeFromBookshelf(book)}>Remove from Bookshelf</button>
          </div>
        ))}
      </div>
      <Link to="/">
        <button className={styles.backButton}>Go back to Search</button>
      </Link>
    </div>
  );
};

export default BookshelfPage;
