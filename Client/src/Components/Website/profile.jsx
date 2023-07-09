import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { getBooks } from './../../Redux/actions/bookAction';

const Profile = () => {

    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({});
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        dispatch(getBooks())
    }, [])

    const data = useSelector(state => state.books.books);

    useEffect(() => {
        setFavoriteBooks(data.filter( (book) => book.isFavorite))
    }, [data])


    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:7777/userInfo/userInfo', {
                    headers: { authorization: `Bearer ${token}` },
                });
                const data = response.data;
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();

    }, []);

    const handleDeleteBook = async (bookId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:7777/userList/deleteBooks`, {
                headers: { authorization: `Bearer ${token}` },
                data: { id: bookId },
            });
            setFavoriteBooks((prevBooks) =>
                prevBooks.filter((book) => book._id !== bookId)
            );
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <>
            <main className="bg-gray-100 bg-opacity-25 mb-10">
                <div className="lg:w-8/12 lg:mx-auto mb-8">
                    <header className="flex flex-wrap justify-center items-center p-4 md:py-8 w-full">
                        <div className="w-full md:w-7/12 ml-4">
                            <div className="md:flex md:flex-wrap md:items-center mb-4">
                                <h2 className="text-grey-darkest font-bold text-4xl text-center text-blue-600 mb-8">
                                    name: {userInfo.userName}
                                </h2>
                            </div>
                            <div className="md:flex md:flex-wrap md:items-center mb-4">
                                <h2 className="text-grey-darkest font-bold text-4xl text-center text-blue-600 mb-8">
                                    email: {userInfo.email}
                                </h2>
                            </div>
                        </div>
                    </header>
                    <div className="w-full items-center justify-center flex">
                        <span className="text-grey-darkest font-bold text-4xl text-center text-blue-600 mb-8">My Favorite Books</span>
                    </div>
                </div>
                <div className='h-full w-full flex items-center justify-center bg-teal-lightest font-sans'>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favoriteBooks?.length > 0 ? (
                            favoriteBooks?.map((book) => (
                                <div key={book._id}>
                                    <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                                        <div className="flex justify-center">
                                            <img className="w-50" src={book.imageLink} alt={book.title} />
                                        </div>
                                        <div className="p-4">
                                            <Link to={book.link}>
                                                <h1 className="mt-4 text-3xl font-bold hover:underline cursor-pointer">{book.title}</h1>
                                            </Link>
                                            <p className="mt-2 font-sans text-gray-700">by {book.author}</p>
                                            <button
                                                onClick={() => handleDeleteBook(book._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4"
                                            >
                                                Delete Book
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            ))
                        ) : (
                            <p>No favorite books found.</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Profile;
