
import { LOGIN, LOG_OUT } from '../types/authTypes';


const initState = {
    isLogIn: localStorage.getItem('token') ? true : false,
};

export const authReducer = (state = initState, active) => {

    switch (active.type) {

        case LOGIN:
            return { isLogIn: true }
        case LOG_OUT:
            return { isLogIn: false }
        default:
            return state
    }
}