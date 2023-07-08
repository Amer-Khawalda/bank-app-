import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7777/books/getBooks');
        const data = response.data.slice(0, 20);
        setBooks(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleFavoriteClick = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:7777/userList/addBooks',
        { bookId },
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log(response.data.error);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-4/5">
        <h1 className="text-grey-darkest font-bold text-4xl text-center text-blue-600">Books</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books && books.length > 0 ? (
            books.map((book) => (
              <div key={book._id}>
                <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                  <div className="">
                    <img className="" src={book.imageLink} alt={book.title} />
                  </div>
                  <div className="p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`click cursor-pointer ${book.isFavorite ? 'active' : ''}`}
                      onClick={() => handleFavoriteClick(book._id)}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
                        className={`fa ${book.isFavorite ? 'bg-red-400' : 'fa-heart-o'}`}
                        fill={book.isFavorite ? '#f52755' : 'black'}
                      />
                    </svg>

                    <h1 className="mt-4 text-3xl font-bold hover:underline cursor-pointer">{book.title}</h1>
                    <p className="mt-2 font-sans text-gray-700">by {book.author}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
