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
                  type="text"
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
            <p className="text-danger pt-2 font-italic">{this.state.error}</p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
