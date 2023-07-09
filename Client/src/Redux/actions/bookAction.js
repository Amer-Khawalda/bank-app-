import axios from 'axios';
import { GET_BOOKS, BOOKS_API, FAVORITE_BOOKS_API } from '../types/bookType';

const isLogIn = localStorage.getItem('token') ? true : false;

export const getBooks = () => {
    return async (dispatch) => {
        try {
            const data = await fetchData();

            if (isLogIn) {
                const filteredData = await getFavoriteList(data);
                console.log(filteredData);
                dispatch({ type: GET_BOOKS, data: filteredData });
            } else {
                console.log(data);
                dispatch({ type: GET_BOOKS, data });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
};

const fetchData = async () => {
    try {
        const response = await axios.get(BOOKS_API);

        const data = response.data.slice(0, 20);
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
};

const getFavoriteList = async (data) => {

    const token = localStorage.getItem('token');
    try {

        const responseFavorite = await axios.get(FAVORITE_BOOKS_API, {
            headers: { authorization: `Bearer ${token}` },
        });

        const filterData = data.map((book) => {
            const res = responseFavorite.data.find((favorite) => favorite.bookId === book._id);
            if (res) {
                book.isFavorite = true
                return book;
            }
            else {
                book.isFavorite = false
                return book;

            }
        });

        return filterData;

    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};
