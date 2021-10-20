import {GET_BOOKS, SET_BOOKLOADING, GET_BOOK, DELETE_BOOK, GET_ERRORS, BOOK_IMAGE} from '../actions/types';

const initialState = {
    book:{},
    books:[],
    loading:false,
    book_image:null
};

const bookReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_BOOKLOADING:
            return {
                ...state,
                loading: true
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

        case DELETE_BOOK :
            return {
                ...state,
                books: state.books.filter(book => book._id !== action.payload)
            } 
            
        case BOOK_IMAGE :  
        return {
            ...state,
            book_image:action.payload,
        }  
        case GET_ERRORS : 
            return {
                ...state,
                loading: false
            }
        default: 
        return state;
    }
}


export default bookReducer;