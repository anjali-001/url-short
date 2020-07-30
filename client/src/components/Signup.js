import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { setUserSession } from "../utils/common";
import Loader from "react-loader-spinner";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      isLoading: false,
      nameError: "",
      emailError:""
    };
  }
validate = () => {
  let nameError = "";
  let emailError = "";
  if(!this.state.email.includes('@')){
      emailError = "invalid email";
  }
  if(!this.state.name){
      nameError = "name cannot be blank";
  }

  if(emailError || nameError){
    this.setState({emailError,nameError})
    return false;
  }
    return true;
}

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      emailError: "",
      nameError:"",
      error:""
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate()
    if(!isValid){
      return;
      console.log('this.state', this.state);
    }
    this.setState({ isLoading: true });
    axios
      .post("/api/user/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
        this.setState({ isLoading: false });
        if (res.data.error) {
          this.setState({
            error: res.data.error,
          });
        } else {
          setUserSession(res.data.token, res.data.user);
          this.props.history.push("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
        <>
        <nav className="navbar navbar-dark nav-background">
               <h3 className="text-light">Bitter links</h3>
               {/* <p>Already registered? Sign in here</p> */}
                <Link to="/signin"><a className="text-light font-weight-bold" href="#">Sign In</a></Link>
           </nav>
      <div className="App-header text-center">
        <div>
          <h2
            style={{
              backgroundColor: "#08353b",
              color: "#ffffff",
              borderRadius: "5px",
            }}
            className="w-100 px-5"
          >
            Sign{" "}
            <span style={{ backgroundColor: "white", padding: "0 3px" }}>
              Up
            </span>
          </h2>
          <form onSubmit={this.handleSubmit}>
            <div className="text-left">
              <label>
                <b>Name:</b>
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  placeholder="Name"
                  required
                  onChange={this.handleChange}
                  className="form-control"
                />
              </label>
              <br />
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
              </label>
              <br />
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
              </label>
              <br />
            </div>
            <button
              type="submit"
              className="btn btn-light btn-outline-secondary text-center btn-style"
            >
              Sign Up
            </button>
            <div
              className={
                this.state.isLoading ? "p-5 m-auto text-center" : "d-none"
              }
            >
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
          <small className="text-danger pt-2 font-italic">
            {this.state.nameError?this.state.nameError:(this.state.emailError?this.state.emailError:(this.state.error?this.state.error:""))}
          </small>
        </div>
      </div>
      </>
    );
  }
}

export default withRouter(Signup);
