import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {setUserSession} from '../utils/common';


class Signin extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            error:null
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
    .then(res=>{
        console.log(res)
        if(res.data.error!=null){
            this.setState({
                error:res.data.error
            })
        }else{
            setUserSession(res.data.token,res.data.user)
            this.props.history.push('/home')
        }
    })
    .catch(err=>{
        console.log(err)
    })
    }

    render(){
        return (
            <React.Fragment>
            <nav className="navbar navbar-dark bg-dark">
               <h3 className="text-light">URL Shortener</h3>
               {/* <p>Not registered? Sign up here</p> */}
                        <Link to="/"><button className="btn btn-light btn-outline-secondary">Signup</button></Link>
           </nav>
            <div className="container form-group">
                <h2 className="col-md-3">Sign In</h2>
                <form className="col-md-4 col-sm-7"  onSubmit={this.handleSubmit}>
                        <label><b>Email:</b>
                        <input name="email" 
                               type="text" 
                               value={this.state.email} 
                               placeholder="Email" 
                               required onChange={this.handleChange} 
                               className="form-control"/>
                        </label>
                        <label><b>Password</b>
                        <input name="password" 
                               type="password" 
                               value={this.state.password} 
                               placeholder="Password" 
                               required onChange={this.handleChange} 
                               className="form-control"/>
                        </label>
                        <button type="submit" 
                                className="btn btn-light btn-outline-secondary col-md-8 col-sm-7">Sign In</button>
                        <p className="text-danger pt-2 font-italic">{this.state.error}</p>
                      
                </form>
                </div>
                </React.Fragment>
        )
    }
    
}

export default Signin
