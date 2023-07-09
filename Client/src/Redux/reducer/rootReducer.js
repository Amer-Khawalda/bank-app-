import { combineReducers } from "redux"
import {authReducer} from './../reducer/authReducer'
import {bookReducer} from './../reducer/bookReducer'


export const rootReducer = combineReducers({
    auth: authReducer,
    books: bookReducer
})