import React from 'react'
import Signup from './Signup'

import {Link} from 'react-router-dom';
import Signin from './Signin';

function Landing() {
    return (
        <div>
           <nav className="navbar navbar-dark nav-background">
               <h3 className="text-light">URL Shortener</h3>
               {/* <p>Already registered? Sign in here</p> */}
                <Link to="/signin"><a className="text-light font-weight-bold" href="#">Sign In</a></Link>
           </nav>
           
            <Signup/>
            
        </div>
    )
}

export default Landing
