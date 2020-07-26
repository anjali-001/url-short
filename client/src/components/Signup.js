import React, {Component} from 'react';
import axios from 'axios';
import {Link,withRouter} from 'react-router-dom';
import {setUserSession} from '../utils/common';

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            email:"",
            password:"",
            error:""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/user/signup",{
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        })
        .then(res=>{
            console.log(res)
            if(res.data.error){
                this.setState({
                    error:res.data.error
                })
            }else{
                setUserSession(res.data.token,res.data.user)
                this.props.history.push('/home')
            }
        })
        .catch(err=>console.log(err))
    }

    render(){
        return (
            <div className="container form-group">
                <h2 className="col-md-4 col-sm-6">Sign Up</h2>
                <form className="col-md-4 col-sm-7" onSubmit={this.handleSubmit}>
                        <label><b>Name:</b>
                        <input name="name" 
                        type="text" 
                        value={this.state.name} 
                        placeholder="Name" 
                        required onChange={this.handleChange} 
                        className="pr-5 form-control"/>
                        </label>
                        <label><b>Email:</b>
                        <input name="email" 
                        type="text" 
                        value={this.state.email} 
                        placeholder="Email" 
                        required onChange={this.handleChange} 
                        className="pr-5 form-control"/>
                        </label>
                        <label><b>Password:</b>
                        <input name="password" 
                        type="password" 
                        value={this.state.password} 
                        placeholder="Password" 
                        required onChange={this.handleChange} 
                        className="pr-5 form-control"/>
                        </label>
                        <button type="submit" 
                        className="btn btn-light btn-outline-secondary col-md-9">Sign Up</button>
                        <p className="text-danger pt-2 font-italic">{this.state.error}</p>
                </form>
                     
            </div>
        )
    }
    
}

export default withRouter(Signup)
