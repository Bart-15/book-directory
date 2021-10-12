import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import bookAvatar  from '../image/book-avatar.png'
import {Link} from 'react-router-dom'
import { Container, List, ListItem, Divider, ListItemText, Avatar, ListItemAvatar, Typography, Button} from '@mui/material'
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
            <>
                <Container>
                    <Button component={Link} to="/add-book">Add Book</Button>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {
                            books.map((book, id) => {
                                return (
                                    <>
                                    <ListItem alignItems="flex-start" key={id}>
                                        <ListItemAvatar>
                                            <Avatar alt="hello avatar" src={bookAvatar} />
                                        </ListItemAvatar>
                                        <Link to={`/book/details/${book._id}`} style={{textDecoration: 'none', color:"#333"}} >
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
                                        </Link>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    </>
                                )
                            })
                        }
                    </List>
                </Container>


            </>
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