import React from "react";
import {Link,withRouter} from 'react-router-dom'
import {removeUserSession} from '../utils/common'

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark nav-background sticky-top">
        <a className="navbar-brand text-light">
          Bitter links
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <Link to='/home'>
            <a className="nav-item nav-link active text-light" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
            </Link>
            <Link to='/guide'>
            <a className="nav-item nav-link text-light">
              Guide
            </a>
            </Link>
            <Link to='/list'>
            <a className="nav-item nav-link text-light">
              List
            </a>
            </Link>
            <a className="nav-item nav-link text-light font-weight-bold" href="#" onClick={()=>{removeUserSession();props.history.push("/signin")}}>
              Signout
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
