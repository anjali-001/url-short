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
                    link: `http://localhost:5000/${res.data.url.hash}`
                })
            }else{
                this.setState({
                    link:`http://localhost:5000/${res.data.hash}`,message:""
                })
            }
        })
        .catch(err=>console.log(err))
    }

    render(){
        if(!getToken())
        return(
            <div>
                 <nav className="navbar navbar-dark bg-dark">
                   <h3 className="text-light">URL Shortener</h3>
                    <Link to="/"><button className="btn btn-light btn-outline-secondary">Sign Up</button></Link>
               </nav>
               <h1>Please Login/Signup First</h1>
            </div>
        )
        return (
            <>
            <Navbar />
            <div className="App-header text-center">
                {/* <nav className="navbar navbar-dark bg-dark">
                   <h3 className="text-light">URL Shortener</h3>
                    <button className="btn btn-light btn-outline-secondary" onClick={this.handleSignout}>Sign Out</button>
                    <Link to="/list" ><button className="btn btn-light btn-outline-secondary">list</button></Link>

               </nav> */}
               
                <h2 className=" p-3 text-center">Shorten URL</h2>
                <form className="" onSubmit={this.handleSubmit}>
                        <div className="form-inline">
                        {/* <label><b>Enter Url :</b></label> */}
                        <input name="url" 
                               type="url" 
                               value={this.state.url}
                               placeholder="URL to be shortened" 
                               required onChange={this.handleChange}
                               className="form-control text-center"/>
                        </div><br/>
                        <div className="form-inline">
                        {/* <label><b>Preferred Hash* </b></label> */}
                        <input name="hash" 
                               type="hash" 
                               value={this.state.hash}
                               placeholder="Preferred hash*" 
                               onChange={this.handleChange}
                               className="form-control text-center"/>
                        </div>
                        <br/>
                        <button type="submit" 
                                className="btn btn-outline-dark">Shorten</button>
                        {/* <p className="text-danger pt-2 font-italic">{this.state.error}</p> */}
                      
                </form>
                <br/>
        <p className="text-danger font-weight-bold mb-2">{this.state.message}</p>
        
        <p> <span><a href={this.state.link} target="_blank" className="text-light nav-background">{this.state.link}</a></span></p>
                </div>
                </>

        )
    }
    
}

export default Home
