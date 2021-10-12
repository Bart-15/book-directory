import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Button} from '@mui/material'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {getSingleBook} from '../actions/bookActions'
class SingleBook extends Component {
    constructor(props) {
        super()
        this.state = {
            image:"",
            errors:{}
        }
    }

    componentDidMount() {
        this.props.getSingleBook(this.props.match.params.id)
        
    }

    render() {
        // const {title, author, description, published, image} = this.props.book.book;
        return (
            <Container>
                <br />
                <Button component={Link} to="/" variant="contained" color="secondary"> Go Back </Button>
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

export default connect(mapStateToProps, {getSingleBook}) (SingleBook);
