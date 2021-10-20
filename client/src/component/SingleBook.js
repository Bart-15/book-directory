import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Card, CardContent, Button, Typography} from '@mui/material'
import {CardInfo} from './styles/styledBooks'
import moment from 'moment'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import {Link} from 'react-router-dom'
import noImage from '../image/no-image.jpg'
import {getSingleBook, getImage} from '../actions/bookActions'
class SingleBook extends Component {
    constructor(props) {
        super()
        this.state = {
            image:null,
            errors:{}
        }
    }

    componentDidMount() {
        this.props.getSingleBook(this.props.match.params.id)
    }



    render() {
        const {title, author, description, published} = this.props.book.book;
        const {book_image, loading, book} = this.props.book;

        let container;
        if(!book || loading) {
            container = (<Spinner loading={loading} />)
        } else {
            if(book) {
                container = (
                    <div>
                    <Card sx={{ maxWidth: 700, alignItems:'center' }}>
                        <CardContent>
                            <Typography variant="h3">{title}</Typography>
                                <CardInfo>
                                    <img src={ book_image ? `data:image/png;base64,${book_image}` : noImage} 
                                    height="250" 
                                    width="250"
                                    alt="book"/>
                                    <Typography variant="subtitle1">Author:{author}</Typography>
                                    <Typography variant="subtitle">Published Date: {moment(published).format('MMMM Do YYYY')}</Typography>
                                    <Typography variant="body2">Description:{description}</Typography>
                                </CardInfo>
                        </CardContent>
                    </Card>
                </div>
                )
            } else {
                container = (
                    <Typography variant="h1">No Book Details</Typography>
                )
            }
        }

        return (
            <Container>
                <br />
                <Button component={Link} to="/" variant="contained" color="secondary"> Go Back </Button>
                <br />
                <br />
                {container}
            </Container>
        )
    }
}

SingleBook.propTypes = {
    getSingleBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    book: state.book
})

export default connect(mapStateToProps, {getSingleBook, getImage}) (SingleBook);
