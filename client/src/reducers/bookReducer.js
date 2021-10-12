import {GET_BOOKS, SET_BOOKLOADING, GET_BOOK} from '../actions/types';

const initialState = {
    book:{},
    books:[],
    loading:false
};

const bookReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_BOOKLOADING:
            return {
                ...state,
                loading:true
            }

        case GET_BOOKS :
            return {
                ...state,
                loading:false,
                books: action.payload
            }

        case GET_BOOK :
            return {
                ...state,
                loading:false,
                book:action.payload
            }

            
        default: 
        return state;
    }
}


export default bookReducer;