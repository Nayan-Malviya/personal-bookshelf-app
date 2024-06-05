import React from 'react';

const Bookshelf = ({ bookshelf, removeFromBookshelf }) => {
  return (
    <div>
      <h2>My Bookshelf</h2>
      {bookshelf.map((book, index) => (
        <div key={index} className="book-card">
          <h3>{book.title}</h3>
          <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
          <button onClick={() => removeFromBookshelf(book)}>Remove from Bookshelf</button>
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;
