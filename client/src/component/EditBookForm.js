import React, { Component } from 'react'
import {Container, Typography, Box, TextField, Button, CssBaseline} from '@mui/material'
import {withRouter, Link} from 'react-router-dom'
import { withStyles } from '@mui/styles';
import moment from 'moment';
import {connect} from 'react-redux'
import {getSingleBook, updateBook} from '../actions/bookActions'
import Spinner from './Spinner'
import isEmpty from '../validation/isEmpty'


const useStyles = theme => ({
    formRoot : {
        flexGrow: 1,
         maxWidth: 752,
          '& .MuiTextField-root': { width: '45ch', margin:'2%' }
    }, 

    form : {
        marginTop:'5px',
        marginBottom:'5px'
    }
})

class EditBookForm extends Component {

    componentDidMount() {
        this.props.getSingleBook(this.props.match.params.id)
    }

    constructor() {
        super();
        this.state = {
            title:'',
            author:'',
            description:'',
            published:'',
            errors:{}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange  = this.onChange.bind(this)
    }

    //if component receive the error props
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }

        if(nextProps.book.book) {
            const book = nextProps.book.book;
            
            book.title = !isEmpty(book.title) ? book.title : " "
            book.author = !isEmpty(book.author) ? book.author : " "
            book.description = !isEmpty(book.description) ? book.description : ""
            book.published = !isEmpty(book.published) ? moment(book.published).format("YYYY-MM-DD") : new Date()
            this.setState({
                id:book._id,
                title: book.title,
                author:book.author,
                description: book.description,  
                published: book.published,
            })
        
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault()
        
        const newUpdate = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            published: moment(this.state.published).format()
        }



        this.props.updateBook(this.props.match.params.id, newUpdate, this.props.history)
        
    }

    render() {
        const {errors} = this.state;
        const {book, loading} = this.props.book;
        const {classes} = this.props;  
        
        let container;

        if(!book || loading) {
            container = (
               <Spinner loading={loading} />
            )
        } else {
            if(book) {
                container = (
                    <Box className={classes.formRoot}  component="form" onSubmit={this.onSubmit} >
                    <TextField 
                    error={errors.title ? true : false}
                    className={classes.form}
                    helperText={errors.title ? errors.title : ""}
                    label="Title"
                    variant="outlined" 
                    name="title" 
                    value={this.state.title} 
                    onChange={this.onChange} />

                    <TextField 
                    error={errors.author ? true : false}
                    className={classes.form}
                    helperText={errors.author ? errors.author : ""}
                    label="Author"
                    variant="outlined" 
                    name="author" 
                    value={this.state.author} 
                    onChange={this.onChange} />

                    <TextField 
                    error={errors.description ? true : false}
                    className={classes.form}
                    helperText={errors.description ? errors.description : ""}
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined" 
                    name="description" 
                    value={this.state.description} 
                    onChange={this.onChange} />

                    <TextField 
                    className={classes.form}
                    type="date"
                    variant="outlined" 
                    name="published" 
                    value={this.state.published} 
                    onChange={this.onChange}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                 />
                 <div>
                    <Button type="submit" variant="contained"  color="primary">Submit</Button>
                 </div>
            </Box>
                )
            } else {
                container = (
                    <Typography variant="h5">Please Reload the page</Typography>
                )
            }
        }


        return (
            <Container>
                <CssBaseline />
                <br />
                <Button type="button" variant="contained" component={Link} to="/" color="secondary">Go Back</Button>
                <Typography variant="h3">Edit Book Details</Typography>
                {container}
                    
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    errors: state.errors,
    book: state.book
})


export default connect(mapStateToProps, {getSingleBook, updateBook}) (withStyles(useStyles)(withRouter(EditBookForm)));