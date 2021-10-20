import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import bookAvatar  from '../image/book-avatar.png'
import {Link} from 'react-router-dom'
import { withStyles } from '@mui/styles';
import { Container, List, ListItem, Divider, ListItemText, Avatar, ListItemAvatar, Typography, Button} from '@mui/material'
import {getBooks, deleteBook} from '../actions/bookActions'
import Spinner from './Spinner'
import {ActionContainer} from './styles/styledBooks'

const styles = {
    btn : {
        fontSize:'10px',
        letterSpacing:'2px',
        margin:'2px'
    },
    addBtn : {
        fontSize:'12px',
        backgroundColor:'#DF6589FF',
        letterSpacing:'2px',
        color:'#3C1053FF',
        '&:hover' : {
            backgroundColor:'#3C1053FF',
            color:'#DF6589FF'
        }
    }
}


class Books extends Component {
    constructor() {
        super()
            this.state = {
                errors:{}
        }
    }

    componentDidMount() {
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
        const {classes} = this.props;
        let bookContainer;

        if(books === null || loading) {
            bookContainer = (
                <Spinner loading={loading} />
            )
        } else  {
            if(books.length > 0) {
                bookContainer = (
                    <div>
                        <br />
                        <Button variant="contained" className={classes.addBtn}component={Link} to="/add-book">Add Book</Button>
                        
                            {
                                books.map((book) => {
                                    return (
                                        <>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} key={book._id}>    
                                        <ListItem  alignItems="flex-start" >
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
                                            <ActionContainer>
                                                <Button className={classes.btn}  variant="contained" component={Link} to={`/edit/book/${book._id}`} color="success">Edit</Button>
                                                <Button className={classes.btn}  variant="contained" component={Link} to={`/book/details/${book._id}`} color="primary">View</Button>
                                                <Button className={classes.btn} component={Link} to={`/upload/image/${book._id}`}  variant="contained">Upload</Button>
                                                <Button className={classes.btn}  onClick={this.onDelete.bind(this, book._id)} variant="contained" color="error">Delete</Button>
                                             </ActionContainer>
                                        <br />
                                        <Divider variant="inset" component="li" />
                                        </List>
                                        </>
                                    )
                                })
                           
                            }
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
    book: PropTypes.object.isRequired,
    getBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {getBooks, deleteBook}) (withStyles(styles)(Books));