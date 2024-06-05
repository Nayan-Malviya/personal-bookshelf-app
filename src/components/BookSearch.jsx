// src/components/BookSearch.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../style/BookSearch.module.scss";

const BookSearch = ({ addToBookshelf }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.length > 1) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://openlibrary.org/search.json?q=${query}&limit=10&page=${page}`
          );
          setBooks(response.data.docs);
          setTotalPages(Math.ceil(response.data.numFound / 10));
        } catch (error) {
          setError("Error fetching data. Please try again.");
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setBooks([]);
      }
    };

    const timeoutId = setTimeout(fetchBooks, 300);
    return () => clearTimeout(timeoutId);
  }, [query, page]);

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={styles.bookSearch}>
      <input
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.bookList}>
        {books.map((book) => (
          <div key={book.key} className={styles.bookCard}>
            <p>
              <strong>Book Title:</strong>
              {book.title}
            </p>
            {/* <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p> */}
            <p>
              <strong>
                Edition Count:
                <strong />
              </strong>{" "}
              {book.edition_count}
            </p>
            <button onClick={() => addToBookshelf(book)}>
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
      {books.length > 0 && (
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={page === 1 || loading}>
            Previous
          </button>
          <span className={styles.pageof}>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages || loading}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
