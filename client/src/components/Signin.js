import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setUserSession } from "../utils/common";
import Loader from "react-loader-spinner";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      isLoading: false,
      emailError:""
    };
  }

  validate = () => {
    let emailError = "";
    if(!this.state.email.includes('@')){
      emailError = "invalid email"
    }

    if(emailError){
      this.setState({emailError});
      return false;
    }
    return true;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      emailError:"",
      error:""
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const isValid = this.validate();
    if(isValid){
      console.log('this.state', this.state);
    }
    axios
      .post("/api/user/signin", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
        this.setState({isLoading: false})
        if (res.data.error != null) {
          this.setState({
            error: res.data.error
          });
        } else {
          setUserSession(res.data.token, res.data.user);
          this.props.history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark nav-background">
          <h3 className="text-light">Bitter links</h3>
          {/* <p>Not registered? Sign up here</p> */}
          <Link to="/signup">
            <a className="text-light font-weight-bold" href="#">
              Sign Up
            </a>
          </Link>
        </nav>
        <div className="App-header text-center">
        <div >
          <h2 style={{backgroundColor:"#08353b",color:"#ffffff",borderRadius:"5px"}}>Sign <span style={{backgroundColor:"white",padding:"0 3px"}}>In</span></h2>
          <form  onSubmit={this.handleSubmit}>
              <div className="text-left">
            <label>
              <b>Email:</b>
              <input
                name="email"
                type=""
                value={this.state.email}
                placeholder="Email"
                required
                onChange={this.handleChange}
                className="form-control"
              />
            </label><br />
            <label>
              <b>Password:</b>
              <input
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Password"
                required
                onChange={this.handleChange}
                className="form-control"
              />
            </label><br /></div>
            <button
              type="submit"
              className="btn btn-light btn-outline-secondary text-center btn-style"
            >
              Sign In
            </button>
            <div className={this.state.isLoading ? "p-5 m-auto text-center" : "d-none"}>
            <Loader
            visible
              type="TailSpin"
              color="black"
              height={40}
              width={40}
              timeout={500000000} //3 secs
            />
            </div>
            
          </form>
          <small className="text-danger pt-2 font-italic">{this.state.emailError?this.state.emailError:(this.state.error?this.state.error:"")}</small>
    
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Signin;
