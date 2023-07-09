import { ADD_FAVORITE_BOOK, REMOVE_FAVORITE_BOOK, GET_BOOKS } from '../types/bookType';


const initState = {
    books: []
};

export const bookReducer = (state = initState, active) => {

    switch (active.type) {
        case GET_BOOKS:
            return { books : active.data}
        default:
            return state
    }
}