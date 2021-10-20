import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container, Card, CardContent, Typography, TextField, Box, Button} from '@mui/material'
import {uploadImg} from '../actions/bookActions'
import { withStyles } from '@mui/styles';

// styles

const styles = (theme) => ({
    root : {
        display:'block',
    },
    btn: {
        marginLeft:'10px'
    }
})

 class UploadImage extends Component {
    constructor() {
        super();
            this.state = {
                image: null,
                errors:{}
            }
            this.handleChange = this.handleChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
       this.setState({image:e.target.files[0]})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        if(!this.state.image) {
           return alert('Please upload file')
        }
        formData.append(
            "image",
            this.state.image,
            this.state.image.name 
        )
         
        this.props.uploadImg(this.props.match.params.id, formData, this.props.history);
    }

    render() {
        const {classes} = this.props;
        const {errors} = this.state;

        console.log(errors)
        return (
            <Container>
                <br />
                <Button variant="contained" color="error" component={Link} to="/" >Go Back</Button>
                <Typography variant="h5">Upload Image</Typography>
                <Card>
                    <CardContent>
                        <Box className={classes.root} sx={{ maxWidth: 752, '& .MuiTextField-root': { m: 1, width: '50ch' } }}
                        component="form" onSubmit={this.handleSubmit} 
                        encType="multipart/form-data">
                            <TextField 
                            error={errors.error ? true : false}
                            variant="standard" 
                            type="file" 
                            helperText={errors.error ? errors.error : ""}
                            name="image" 
                            onChange={this.handleChange} InputProps={{
                              disableUnderline: true,
                            }}/>
                            <div>
                                <Button className={classes.btn} type="submit" onClick={this.handleSubmit} variant="contained">Submit</Button>
                            </div>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

UploadImage.propTypes = {
    uploadImg : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})
export default connect(mapStateToProps, {uploadImg}) (withStyles(styles)(withRouter(UploadImage)));