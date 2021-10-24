import {SET_BOOKLOADING, GET_BOOKS, GET_ERRORS, GET_BOOK, DELETE_BOOK, CLEAR_ERRORS} from '../actions/types'
import axios from 'axios'

const setBookLoading = () => {
    return {
        type: SET_BOOKLOADING
    }
}

const clearErrorMSG = () => {
    return {
        type: CLEAR_ERRORS
    }
}

const getBooks = () => dispatch => {
    dispatch(setBookLoading())
    // dispatch(clearErrorMSG())
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
        .then(res => {
            history.push('/')
            dispatch(getBooks())
        })
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

const deleteBook = (id) =>  dispatch => {
    axios.delete(`/api/book/${id}`)
        .then(res => {
            dispatch({
                type:DELETE_BOOK,
                payload: id
            })
             dispatch(getBooks())
        })
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
        )
}

const updateBook = (id, data, history) => dispatch => {
    axios.patch(`/api/book/${id}`, data)
    .then(res => {
        history.push('/')
    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
}

const uploadImg = (id,data, history) => dispatch => {
    axios.post(`/api/book/upload/${id}`, data)
    .then(res=> history.push("/"))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload: err.response.data
    }))
}

export  {
    getBooks,
    getSingleBook,
    addBook,
    deleteBook,
    updateBook,
    uploadImg,
}