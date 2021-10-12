import React, { Component } from 'react'
import {Container, Typography, Box, TextField, Button} from '@mui/material'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addBook} from '../actions/bookActions'
class FormBook extends Component {

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
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault()
        
        const newBook = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            published: this.state.published
        }
        this.props.addBook(newBook, this.props.history)
        
    }

    render() {
        const {errors} = this.state;
        console.log(errors)
        return (
            <Container>
                <Typography variant="h3">Add Book</Typography>
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
    errors: state.errors
})


export default connect(mapStateToProps, {addBook}) (withRouter(FormBook));