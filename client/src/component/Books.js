import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import bookAvatar  from '../image/book-avatar.png'
import {Link} from 'react-router-dom'
import { Container, List, ListItem, Divider, ListItemText, Avatar, ListItemAvatar, Typography, Button} from '@mui/material'
import {getBooks, deleteBook} from '../actions/bookActions'
import Spinner from './Spinner'
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

    onDelete(id) {
        this.props.deleteBook(id)
    }

    render() {
        const {books, loading} = this.props.book;
        
        let bookContainer;

        if(books === null || loading) {
            bookContainer = (
                <Spinner loading={loading} />
            )
        } else  {
            if(books.length > 0) {
                bookContainer = (
                    <div>
                        <Button component={Link} to="/add-book">Add Book</Button>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                books.map((book, idx) => {
                                    return (
                                        <>
                                        <ListItem alignItems="flex-start" key={idx}>
                                            <ListItemAvatar>
                                                <Avatar alt="hello avatar" src={bookAvatar} />
                                            </ListItemAvatar>
                                                <ListItemText
                                                    primary={`${book.title}`}
                                                    secondary={
                                                        <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                            to="/book-details/"
                                                        >
                                                            Author
                                                        </Typography>
                                                        {` — ${book.author}`}
                                                        </React.Fragment>
                                                    }
                                                />
                                        </ListItem>
                                            <div style={{marginLeft:'75px'}}>
                                                <Button variant="contained" component={Link} to={`/edit/book/${book._id}`} color="success">Edit</Button>
                                                <Button variant="contained" component={Link} to={`/book/details/${book._id}`} color="primary">View</Button>
                                                <Button onClick={this.onDelete.bind(this, book._id)} variant="contained" color="error">Delete</Button>
                                             </div>
                                        <br />
                                        <Divider variant="inset" component="li" />
                                        </>
                                    )
                                })
                            }
                        </List>
                    </div>
                )
            } else {
                bookContainer = (
                    <div>
                        <br />
                        <Typography variant="h4">No Books :(</Typography>
                        <Button variant="contained" component={Link} to="/add-book" color="primary">Add now!</Button>
                    </div>
                )
            }
            
        } 


        return (
            <>
             <Container>
                {bookContainer}
             </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    book:state.book
})

Books.propTypes = {
    book: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {getBooks, deleteBook}) (Books);