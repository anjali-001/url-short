import React,{Component} from 'react';
import axios from 'axios';
class Signin extends Component{
    constructor(){
        super()
        this.state = {
            email:"",
            password:""
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        
    axios.post("http://localhost:5000/api/user/signin",{email:this.state.email,password:this.state.password})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    }

    render(){
        return (
            <div className="container form-group">
                <h2>SignIn</h2>
                <form className="col-md-4 col-sm-3"  onSubmit={this.handleSubmit}>
                        <label><b>Email:</b>
                        <input name="email" type="text" value={this.state.email} placeholder="Email" required onChange={this.handleChange}/>
                        </label>
                        <label><b>Password</b>
                        <input name="password" type="text" value={this.state.password} placeholder="Password" required onChange={this.handleChange}/>
                        </label>
                        <button type="submit">Sign In</button>
                </form>
                </div>
        )
    }
    
}

export default Signin
