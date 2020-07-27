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
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:5000/api/user/signin", {
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
          <h3 className="text-light">URL Shortener</h3>
          {/* <p>Not registered? Sign up here</p> */}
          <Link to="/">
            <a className="text-light font-weight-bold" href="#">
              Sign Up
            </a>
          </Link>
        </nav>
        <div className="App-header text-center">
        <div >
          <h2 >Sign In</h2>
          <form  onSubmit={this.handleSubmit}>
              <div className="text-left">
            <label>
              <b>Email:</b>
              <input
                name="email"
                type="email"
                value={this.state.email}
                placeholder="Email"
                required
                onChange={this.handleChange}
                className="form-control"
              />
            </label><br />
            <label>
              <b>Password</b>
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
              className="btn btn-light btn-outline-secondary text-center"
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
            <p className="text-danger pt-2 font-italic">{this.state.error}</p>
          </form>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Signin;
