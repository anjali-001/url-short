import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {removeUserSession} from '../utils/common';
import axios from 'axios';
import {getToken } from '../utils/common'
import Navbar from './Navbar'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = ({
            url:"",
            hash:"",
            link:"",
            message:""
        })
    }

    // handleSignout = () => {
    //     removeUserSession();
    //     this.props.history.push('/signin')
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/shorten",{
            url:this.state.url,
            hash:this.state.hash
        },{headers:{'auth-token':getToken()}})
        .then(res => {
            console.log(res)
            if(res.data.message){
                this.setState({
                    message:res.data.message,
                    link: `https://bitterlinks.herokuapp.com/${res.data.url.hash}`
                })
            }else{
                this.setState({
                    link:`https://bitterlinks.herokuapp.com/${res.data.hash}`,message:""
                })
            }
        })
        .catch(err=>console.log(err))
    }

    render(){
        if(!getToken())
        return(
            <div>
                 <nav className="navbar navbar-dark nav-background">
                    <h3 className="text-light">Bitter Links</h3>
                    <div className="ml-auto">
                    <Link to="/">
                            <a className="text-light font-weight-bold pr-2" href="#"> SignUp</a>
                    </Link>   
                    <Link to="/signin">
                            <a className="text-light font-weight-bold" href="#"> SignIn</a>
                    </Link>  
                    </div>          
                  </nav>
               <h1 className="App-header">Please Signin/Signup First</h1>
            </div>
        )
        return (
            <>
            <Navbar />
            <div className="App-header text-center">
                <h2 className="px-4" style={{backgroundColor:"#08353b",color:"#ffffff",borderRadius:"5px"}}>Shorten <span style={{backgroundColor:"white",padding:"0 3px"}}>Link</span></h2>
                <form className="" onSubmit={this.handleSubmit}>
                        <div className="form-inline">
                        {/* <label><b>Enter Url :</b></label> */}
                        <input name="url" 
                               type="string" 
                               value={this.state.url}
                               placeholder="Link without https://" 
                               required onChange={this.handleChange}
                               className="form-control text-center"/>
                        </div><br/>
                        <div className="form-inline">
                        {/* <label><b>Preferred Hash* </b></label> */}
                        <input name="hash" 
                               type="hash" 
                               value={this.state.hash}
                               placeholder="Preferred hash(optional)" 
                               onChange={this.handleChange}
                               className="form-control text-center"/>
                        </div>
                        <br/>
                        <button type="submit" 
                                className="btn btn-outline-dark btn-style">Shorten</button>
                        {/* <p className="text-danger pt-2 font-italic">{this.state.error}</p> */}
                      
                </form>
                <br/>
        <p className="text-danger font-weight-bold font-italic mb-2">{this.state.message}</p>
        
        <p style={{backgroundColor:"#08353b"}}> <span><a href={this.state.link} target="_blank" className="text-light">{this.state.link}</a></span></p>
                </div>
                </>

        )
    }
    
}

export default Home
