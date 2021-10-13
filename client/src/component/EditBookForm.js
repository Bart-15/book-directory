import React, { Component } from 'react'
import {Container, Typography, Box, TextField, Button} from '@mui/material'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleBook, updateBook} from '../actions/bookActions'
import isEmpty from '../validation/isEmpty'
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
            book.description = !isEmpty(book.description) ? book.description : " "
            book.published = !isEmpty(book.published) ? book.published : " "
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
            published: this.state.published
        }



        this.props.updateBook(this.props.match.params.id, newUpdate, this.props.history)
        
    }

    render() {
        const {errors} = this.state;
        return (
            <Container>
                <Typography variant="h3">Edit Book Details</Typography>
                <Box sx={{ flexGrow: 1, maxWidth: 752, '& .MuiTextField-root': { m: 1, width: '50ch' } }} component="form" onSubmit={this.onSubmit} >
                        <TextField 
                        error={errors.title ? true : false}
                        helperText={errors.title ? errors.title : ""}
                        label="Title"
                        variant="outlined" 
                        name="title" 
                        value={this.state.title} 
                        onChange={this.onChange} />

                        <TextField 
                        error={errors.author ? true : false}
                        helperText={errors.author ? errors.author : ""}
                        label="Author"
                        variant="outlined" 
                        name="author" 
                        value={this.state.author} 
                        onChange={this.onChange} />

                        <TextField 
                        error={errors.description ? true : false}
                        helperText={errors.description ? errors.description : ""}
                        label="Description"
                        variant="outlined" 
                        name="description" 
                        value={this.state.description} 
                        onChange={this.onChange} />

                        <TextField 
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
                        <Button type="submit" variant="contained"  color="primary">Submit</Button>
                </Box>
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
    errors: state.errors,
    book: state.book
})


export default connect(mapStateToProps, {getSingleBook, updateBook}) (withRouter(EditBookForm));