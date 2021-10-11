import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import axios from 'axios';
import {getBooks} from '../actions/bookActions'
class Books extends Component {
    constructor() {
        super()
            this.state = {
                errors:{}
            }
    
    }


    componentWillMount() {
        this.props.getBooks()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.error) {
            this.setState({errors: nextProps.errors})
        }
    }



    render() {
        const books = this.props.book;
        
   
        return (
            <div>
                <div>
                   {
                       books.map((book) => {
                           return (
                               <p>{book.title}</p>
                           )
                       })
                   }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    book:state.book.books
})

Books.propTypes = {
    book: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {getBooks}) (Books);