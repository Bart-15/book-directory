import {SET_BOOKLOADING, GET_BOOKS, GET_ERRORS, GET_BOOK} from '../actions/types'
import axios from 'axios'


const getBooks = () => dispatch => {
    dispatch(setBookLoading())
    axios.get('/api/books/')
        .then(res => dispatch({
            type:GET_BOOKS,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))

}
const setBookLoading = () => {
    return {
        type: SET_BOOKLOADING
    }
}

const getSingleBook = (id) => dispatch => {
    dispatch(setBookLoading())
    axios.get("/api/book/"+id)
        .then(res =>  dispatch({
            type:GET_BOOK,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

const addBook = (data, history) => dispatch => {
    axios.post('/api/book/', data)
        .then(res =>  history.push('/'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))

}

export  {
    getBooks,
    getSingleBook,
    addBook
}