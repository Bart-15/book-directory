import {SET_BOOKLOADING, GET_BOOKS, GET_ERRORS} from '../actions/types'
import axios from 'axios'
// set loading


const getBooks = () => dispatch => {
    dispatch(setBookLoading())
    axios.get('/api/books/')
        .then(res => dispatch({
            type:GET_BOOKS,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            dispatch:err.response.data
        }))

}
const setBookLoading = () => {
    return {
        type: SET_BOOKLOADING
    }
}

export  {
    getBooks
}