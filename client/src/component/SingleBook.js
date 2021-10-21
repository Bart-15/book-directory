import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Card, CardContent, Button, Typography} from '@mui/material'
import {withStyles} from '@mui/styles'
import {CardInfo} from './styles/styledBooks'
import moment from 'moment'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import {Link} from 'react-router-dom'
import noImage from '../image/no-image.jpg'
import {getSingleBook} from '../actions/bookActions'

const useStyles = theme => ({
    description : {
        lineHeight :'25px',
        textIndent :'20px',
        fontWeight:'600',
        fontSize:'15px',
        letterSpacing:'1px',
        color:theme.palette.secondary.main
    },

    title : {
        textTransform:'uppercase'
    },

    date : {
        color:theme.palette.primary.main,
        fontWeight:'600',
        textTransform:'uppercase',
        letterSpacing:'1.5px'
    },

    author : {
        fontWeight:'600px',
        letterSpacing:'2px'
    }
})


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
        const {title, author, description, published, image} = this.props.book.book;
        const {loading, book} = this.props.book;
        const {classes} = this.props;

        let container;
        if(!book || loading) {
            container = (<Spinner loading={loading} />)
        } else {
            if(book) {
                container = (
                    <div>
                    <Card sx={{ maxWidth: 700, alignItems:'center', boxShadow: 3 }}>
                        <CardContent>
                            <Typography className={classes.title} variant="h4">{title}</Typography>
                                <CardInfo>
                                    <a href={`data:image/png;base64,${image}`} target="_blank" rel="noreferrer">
                                    <img src={ image ? `data:image/png;base64,${image}` : noImage} 
                                    height="250" 
                                    width="250"
                                    alt="book"/>
                                    </a>
                                    <Typography className={classes.author} variant="subtitle1">Author:{author}</Typography>
                                    <Typography className={classes.date} variant="subtitle1">{moment(published).format('MMMM Do YYYY')}</Typography>
                                    <Typography className={classes.description} variant="body2">{description}</Typography>
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

export default connect(mapStateToProps, {getSingleBook}) (withStyles(useStyles)(SingleBook));
