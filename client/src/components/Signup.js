import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:""
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
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    render(){
        return (
            <div className="container form-group">
                <h2>SignUp Form</h2>
                <form className="col-md-4 col-sm-3" onSubmit={this.handleSubmit}>
                        <label><b>Name: </b>
                        <input name="name" type="text" value={this.state.name} placeholder="Name" required onChange={this.handleChange} className="pr-5"/>
                        </label>
                        <label><b>Email: </b>
                        <input name="email" type="text" value={this.state.email} placeholder="Email" required onChange={this.handleChange} className="pr-5"/>
                        </label>
                        <label><b>Pswd: </b>
                        <input name="password" type="text" value={this.state.password} placeholder="Password" required onChange={this.handleChange} className="pr-5"/>
                        </label>
                        <button type="submit" className="btn btn-light btn-outline-secondary btn-block">Sign Up</button>
                </form>
                <p>Already registered? Sign in here</p>
            <Link to="/signin"><button>Signin</button></Link>
                </div>
        )
    }
    
}

export default Signup
