import React, { Component } from 'react'
import {Container, Typography, Box, TextField, Button} from '@mui/material'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
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
            published: moment(this.state.published).format("YYYY-MM-DD")
        }
        this.props.addBook(newBook, this.props.history)
        
    }

    render() {
        const {errors} = this.state;
        return (
            <Container>
                <br />
                <Button type="button" variant="contained" component={Link} to="/" color="error">Go Back</Button>
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
                        helperText={errors.description ? errors.description : ""}                        variant="outlined" 
                        name="description" 
                        value={this.state.description}
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
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